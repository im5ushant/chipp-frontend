from dotenv import load_dotenv
import os
from sqlalchemy import text, create_engine
import psycopg2 
from psycopg2.extras import execute_values
import boto3
import pickle
import os
import tempfile

def connect_to_redshift():
    connection_str = 'postgresql://{usr}:{pwd}@{host}:5439/{db}'.format(
        usr=os.environ['REDSHIFT_USERNAME'],
        pwd=os.environ['REDSHIFT_PASSWORD'],
        host=os.environ['REDSHIFT_HOST'],
        db=os.environ['TENANT']
    )
    sql_engine = create_engine(connection_str) 
    return sql_engine

import pandas as pd 


def read_from_redshift(sql_engine, query):
    with sql_engine.connect() as conn:
        data = conn.execute(query)
        df = pd.DataFrame(list(data), columns=list(data.keys()))  
        return df

query = """
select * from STAGE.house_pricesarc20231010150139
"""
sql_engine = connect_to_redshift()
df = read_from_redshift(sql_engine, query)

df = df[df['bedrooms'] > 0]

data = df.drop(['date',
                'city',
                'PEAKAUDITCREATEDAT', 
                'REQUEST_ID'], axis=1)

# Building and fitting a Linear Regression model. You can change this
print("Build Model and add predictions to dataset")
model = LinearRegression().fit(data.drop('price', axis=1), data['price'])

# Prediciting on the data we have and appending the column to the orginal df 
predictions = model.predict(data.drop('price', axis=1))
df['predictions'] = predictions

# Altering the datatypes of df, ready to be saved into Snowflake
print("Changing datatypes as table in Snowflake has integers")
df['price'] = df['price'].astype(int)
df['predictions'] = df['predictions'].astype(int)
df['bedrooms'] =  df['bedrooms'].astype(int)
df['bathrooms'] =  df['bathrooms'].astype(int)
df['floors'] =  df['floors'].astype(int)

# Removing some fields we dont need 
df = df.drop(['PEAKAUDITCREATEDAT', 'REQUEST_ID'], axis=1)

# Changing the columns to upper case for Snowflake
df.columns = map(lambda x: str(x).upper(), df.columns)

# Creating some querys to create, delete and copy the prediction from our datalake
print("Querys to create, delete and copy predictions from S3")
create_table_query = """
CREATE OR REPLACE TABLE PUBLISH.HOUSEPRICE_PREDICTIONS (
date varchar(256),
  price integer,
  bedrooms integer,
  bathrooms integer,
  sqftliving integer,
  sqftlot integer,
  floors integer,
  waterfront integer,
  view integer,
  condition integer,
  sqftabove integer,
  sqftbasement integer,
  yrbuilt integer,
  yrrenovated integer,
  city varchar(256),
  predictions integer
)
"""

delete_query = "delete from PUBLISH.HOUSEPRICE_PREDICTIONS"

# Using our connection string to execture these queries
conn.cursor().execute(create_table_query)

conn.cursor().execute(delete_query)

print("Writing predictions data to Snowflake")

success, _, nrows, output = write_pandas(
            conn,
            df,
            table_name="HOUSEPRICE_PREDICTIONS",
            schema="PUBLISH",
            quote_identifiers=False
        )

print("Number of successful rows {}".format(nrows))

# Saving our model to our datalake to use later
print("Save model to s3")
s3 = boto3.client("s3")
with tempfile.TemporaryFile() as fp:
    pickle.dump(model, fp)
    fp.seek(0)
    s3.upload_fileobj(fp, 
                      Bucket=os.environ['DATA_LAKE'],
                      Key=key_model_save)

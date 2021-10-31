import React, { useContext, useState } from "react";
import { TextField, TextareaAutosize } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/UIElements/Button/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";

const EditForm = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const initialValues = {
    title: props.title,
    description: props.description,
    cover: props.cover,
  };

  const [values, setValues] = useState(initialValues);
  const [titleValid, setTitleValid] = useState(true);
  const [descValid, setDescValid] = useState(true);
  const [coverValid, setCoverValid] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const validate = () => {
    if (values.cover === null) {
      setCoverValid(false);
      return false;
    } else {
      setCoverValid(true);
    }

    if (values.title.length === 0) {
      setTitleValid(false);
      return false;
    } else {
      setTitleValid(true);
    }

    if (values.description.length < 199) {
      setDescValid(false);
      return false;
    } else {
      setDescValid(true);
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const imageInputHandler = (id, file) => {
    setValues({
      ...values,
      [id]: file,
    });
  };

  const editFundraiserHandler = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        if (values.cover !== props.cover)
          formData.append("cover", values.cover);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/fundraiser/${props.fId}/edit`,
          "PATCH",
          formData,
          { Authorization: "Bearer " + auth.token }
        );
        history.push(`/fundraiser/${props.fId}`);
      } catch (err) {}
    }
  };

  return (
    <>
      <div className="edit-fundraiser__field-container">
        <div className="edit-fundraiser__custom-label">
          Fundraiser Cover Photo
        </div>
        <ImageUpload
          modal
          id="cover"
          center
          quality="0.8"
          image={props.cover}
          onInput={imageInputHandler}
        >
          Change Cover
        </ImageUpload>
      </div>
      <div className="edit-fundraiser__field-container">
        <div className="edit-fundraiser__custom-label">Fundraiser Title</div>
        <TextField
          className="add-info__text-field"
          variant="outlined"
          label="Fundraiser Title"
          value={values.title}
          name="title"
          {...(!titleValid && {
            error: true,
            helperText: "*Invalid Field",
          })}
          onChange={handleInputChange}
        />
      </div>
      <div className="edit-fundraiser__field-container">
        <div className="edit-fundraiser__custom-label">
          Enter description of your fundraiser*
        </div>
        <TextareaAutosize
          className={
            descValid
              ? `create-fundraiser__text-area`
              : "create-fundraiser__text-area error"
          }
          value={values.description}
          name="description"
          aria-label="minimum height"
          rowsMin={15}
          placeholder="Enter Description (Minimum 200 words)"
          onChange={handleInputChange}
        />
      </div>
      <div className="add-info__button-container">
        <Link to="/">
          <Button div>Cancel</Button>
        </Link>
        <Button dark classes="submit-btn" onClick={editFundraiserHandler}>
          Confirm
        </Button>
      </div>
    </>
  );
};

export default EditForm;

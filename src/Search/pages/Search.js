import React, {useState} from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import CardContainer from "../../shared/components/UIElements/Containers/CardContainer";
import SearchResultList from "../components/SearchResultList";

import "./Search.css";

const Search = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFundraisers, setLoadedFundraisers] = useState();
  const [notFound, setNotFound] = useState(true);

  return (
    <>
      <div className="search__container">
          <CardContainer heading="Search Results">
            {notFound && (
              <div className="search__not-found">
                No Fundraisers Found!
              </div>
            )}
            {!isLoading && !notFound && loadedFundraisers && (
              <SearchResultList items={loadedFundraisers} />
            )}
          </CardContainer>
      </div>
    </>
  );
};

export default Search;

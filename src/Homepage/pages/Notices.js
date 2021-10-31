import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

import Footer from '../../shared/components/Footer/Footer';
import AuthModal from '../../shared/components/UIElements/Modal/AuthModal';
import NoticeFilterModal from "../../shared/components/UIElements/Modal/NoticeFilterModal";
import NoticeItem from "../components/NoticeItem";

import "./Notices.css";

const Notices = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedNotices, setLoadedNotices] = useState();

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/notice/notices`
        );
        setLoadedNotices(responseData.notices);
      } catch (err) {}
    };
    fetchNotices();
  }, [sendRequest]);

  const submitInfoHandler = async (event) => {
    event.preventDefault();

    if (auth.isLoggedIn) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+`/api/notice/noticebyuser/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedNotices(responseData.notices);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const filteredResponseHandler = (filteredData) => {
    setLoadedNotices(filteredData.notices);
    // console.log(filteredData);
  };

  const showFilterModalHandler = () => {
    setShowFilterModal(true);
  };
  const cancelFilterModalHandler = () => {
    setShowFilterModal(false);
  };
  const confirmFilterModalHandler = () => {
    setShowFilterModal(false);
  };

  const showAuthModalHandler = () => {
    setShowAuthModal(true);
  };
  const cancelAuthModalHandler = () => {
    setShowAuthModal(false);
  };
  const confirmAuthModalHandler = () => {
    setShowAuthModal(false);
  };

  const addNewHandler = () => {
    if (auth.isLoggedIn) {
      history.push("/create-notice");
    } else {
      showAuthModalHandler();
    }
  };

  return (
    <div className="notices__main-container">
      <NoticeFilterModal
        showModal={showFilterModal}
        onCancel={cancelFilterModalHandler}
        onConfirm={confirmFilterModalHandler}
        filterResponse={filteredResponseHandler}
      ></NoticeFilterModal>
      <AuthModal
        showModal={showAuthModal}
        onCancel={cancelAuthModalHandler}
        onConfirm={confirmAuthModalHandler}
      ></AuthModal>
      <div className="notices__header">
        <div className="notices__header-subcontainer">
          <h2>Notices</h2>
        </div>
      </div>
      {error && <p>Something went wrong!</p>}
      <div className="notices__tools">
        <div className="notices__filter-container" onClick={showFilterModalHandler}>
          <i class="fas fa-filter"></i>&nbsp;&nbsp;Filter
        </div>
        {auth.isLoggedIn && <div
          className="notices__my-contribution-container"
          onClick={submitInfoHandler}
        >
          <i class="fas fa-user-clock"></i>&nbsp;&nbsp;My Notices
        </div>}
        <div onClick={addNewHandler} className="notices__add-container">
          <i class="fas fa-plus"></i>&nbsp;&nbsp;New
        </div>
      </div>
      <div className="notices__content">
        {!isLoading &&
          loadedNotices &&
          loadedNotices.map((notice) => (
            <NoticeItem
              id={notice.id}
              creator={notice.creator}
              state={notice.state}
              city={notice.city}
              category={notice.category}
              supplier={notice.name}
              phone1={notice.phone1}
              phone2={notice.phone2}
              message={notice.msg}
              date={notice.date}
            />
          ))}
      </div>
    </div>
  );
};

export default Notices;

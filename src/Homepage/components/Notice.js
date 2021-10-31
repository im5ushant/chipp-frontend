import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import AuthModal from "../../shared/components/UIElements/Modal/AuthModal";
import Carousel from "react-elastic-carousel";
import { Link, useHistory } from "react-router-dom";
import NoticeCard from "./NoticeCard";
import "./Notice.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Notice = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedNotices, setLoadedNotices] = useState();
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/notice/notices`
        );
        setLoadedNotices(responseData.notices);
      } catch (err) {}
    };
    fetchNotices();
  }, [sendRequest]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = () => {
    setShowModal(false);
  };

  const addNewHandler = () => {
    if(auth.isLoggedIn){
      history.push("/create-notice");
    } else {
      showModalHandler();
    }
  }

  return (
    <>
      <AuthModal
        showModal={showModal}
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
      ></AuthModal>
      <div className="notice__header-container">
        <h2>Recent Notices</h2>
      </div>
      {error && <p>Something went wrong</p>}
      {isLoading && <LoadingSpinner />}
      <div className="notice__tools">
        <Link className="notice__see-all-container" to="/notices">
          <div>
            <i class="fas fa-search"></i>
            <br />
            See All
          </div>
        </Link>
        
          <div onClick={addNewHandler} className="notice__add-container">
            <i class="fas fa-plus"></i>
            <br />
            New
          </div>
      </div>
      <div className="notice__main-container rec-arrow rec-dot">
        <Carousel enableAutoPlay autoPlaySpeed={3000} breakPoints={breakPoints}>
          {!isLoading &&
            loadedNotices &&
            loadedNotices.map((notice) => (
              <NoticeCard
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
        </Carousel>
      </div>
    </>
  );
};

export default Notice;

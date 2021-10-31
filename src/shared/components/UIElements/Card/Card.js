import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ChippBtn from "../Button/ChippBtn";
import "./Card.css";

const Card = (props) => {
  const auth = useContext(AuthContext);
  const [confirmModal, setConfirmModal] = useState(false);
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const loaderPercentage =
    (Number(props.collectionAmt) / Number(props.amount)) * 100 > 100
      ? 100
      : (Number(props.collectionAmt) / Number(props.amount)) * 100;

  const showModalHandler = () => {
    setConfirmModal(true);
  };

  const cancelModalHandler = () => {
    setConfirmModal(false);
  };

  const confirmModalHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/api/fundraiser/${props.id}/disable`,
        "PATCH",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
      setConfirmModal(false);
    } catch (err) {}
  };

  return (
    <>
      <Modal
        show={confirmModal}
        onCancel={cancelModalHandler}
        headerClass="confirm-modal__header"
      >
        <div className="confirm-modal__container">
          <h4>Are you sure want to disable this fundraiser?</h4>
          <p>This action cannot be undone!</p>
          <div>
            <Button div onClick={cancelModalHandler}>
              Cancel
            </Button>
            <Button div dark onClick={confirmModalHandler}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <div className={`card__container ${props.classes}`}>
        <div className={props.disabled ? "card card__disabled" : "card"}>
          <Link to={`/fundraiser/${props.id}`}>
            <div
              className="card__image"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${props.image})`,
              }}
            ></div>
          </Link>
          <div className="card__info">
            <div className="location">{props.pincode}</div>
            <Link to={`/fundraiser/${props.id}`}>
              <div className="heading">{props.title}</div>
            </Link>
            <div className="details">{props.description}</div>
            <div className="amount">
              <div className="progress-bar">
                <div
                  className="raised-progress-bar"
                  style={{ width: `${loaderPercentage}%` }}
                ></div>
              </div>
              <div className="amount-raised">
                <span>
                  <i class="fas fa-rupee-sign"></i> {props.collectionAmt}{" "}
                  Chipped
                </span>{" "}
                of <i class="fas fa-rupee-sign"></i> {props.amount}
              </div>
              {props.edit && !props.disabled && (
                <div className="card__edit-container">
                  <Button
                    to={`/${props.id}/edit`}
                    classes="card__edit-btn"
                  >
                    <i class="far fa-edit"></i> <span>Edit</span>
                  </Button>
                  <Button
                    to={`/${props.id}/update`}
                    classes="card__edit-btn"
                  >
                    <i class="fas fa-plus"></i>
                    <span>Update</span>
                  </Button>
                  <Button onClick={showModalHandler} classes="card__edit-btn disable-btn">
                    <i class="fas fa-ban"></i>
                    <span>Disable</span>
                  </Button>
                </div>
              )}
              {props.disabled && (
                <div className="card__edit-container">
                  <Button disabled classes="card__edit-btn">
                    <i class="fas fa-ban"></i>

                    <span>Disabled</span>
                  </Button>
                </div>
              )}
              {props.chipp && (
                <ChippBtn fundraiserId={props.id} classes="card__chipp-btn">
                  Chipp Now
                </ChippBtn>
              )}
            </div>
          </div>
          {/* <div className="chipp-btn"></div> */}
        </div>
      </div>
    </>
  );
};

export default Card;

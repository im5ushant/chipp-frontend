import React, { useState, useRef } from "react";
import { useHttpClient } from "../../../hooks/http-hook";
import Cropper from "react-easy-crop";
import { Slider } from "@material-ui/core";

import {getCroppedImg} from '../../../util/getCroppedImg';
import {dataURLtoFile} from '../../../util/dataURLtoFile';
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button/Button";
import Modal from "./Modal";

import "./ProfilePicModal.css";

const UploadPicModal = (props) => {
  const inputRef = useRef();

  const triggerImageSelectPopup = () => inputRef.current.click();

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const cropCompleteHandler = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const selectFileHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  const confirmImageHandler = async () => {
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg");
    const convertedFile = dataURLtoFile(canvasDataUrl, `${props.id}.jpeg`)
    props.onConfirm(convertedFile, canvasDataUrl);
  }

  return (
    <>
      <Modal
        show={props.showModal}
        onCancel={props.onCancel}
        className="profile-pic-modal__modal-container"
        header={
          <>
            <div className="fundraiser-category-modal__header">
              Upload Photo
            </div>
          </>
        }
        footerClass="fundraiser-category-modal__footer"
      >
        <div className="profile-pic-modal__main-container">
          {image && (
            <div className="profile-pic-modal__cropper-container">
              <div className="profile-pic-modal__cropper">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  minZoom={1}
                  maxZoom={3}
                  showGrid={false}
                  aspect={16/9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={cropCompleteHandler}
                />
              </div>
              <div className="profile-pic-modal__slider">
                <Slider
                  min={1}
                  max={3}
                  step={0.01}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
            </div>
          )}
          <div className="profile-pic-modal__controls">
            <div className="profile-pic-modal__buttons">
              <input
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={selectFileHandler}
              />
              <Button dark div onClick={triggerImageSelectPopup}>
                Choose
              </Button>
              {image && <Button dark div onClick={confirmImageHandler}>
                Confirm
              </Button>}
              <Button div onClick={props.onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadPicModal;

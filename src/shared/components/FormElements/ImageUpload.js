import React, { useRef, useState, useEffect } from "react";
import Compressor from "compressorjs";

import UploadPicModal from "../UIElements/Modal/UploadPicModal";
import Button from "../UIElements/Button/Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.image);
  const [isValid, setIsValid] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const compressedImageHandler = (image) => {
    new Compressor(image, {
      quality: props.quality, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server.
        props.onInput(props.id, compressedResult);
      },
    });
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = (image, imageDataUrl) => {
    if (!image) {
      return;
    }
    setFile(image);
    setPreviewUrl(imageDataUrl);
    setShowModal(false);
    compressedImageHandler(image);
  };

  const filePickerRef = useRef();

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file);
  // }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(pickedFile);
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
    compressedImageHandler(pickedFile);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <>
      {props.cover ? setPreviewUrl(props.cover) : null}

      <div className="form-control">
        {props.modal && (
          <UploadPicModal
            id={props.id}
            showModal={showModal}
            onCancel={cancelModalHandler}
            onConfirm={confirmModalHandler}
          ></UploadPicModal>
        )}
        <input
          id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`image-upload ${props.center && "center"}`}>
          {props.preview && (
            <div className="image-upload__preview" onClick={props.modal ? showModalHandler : pickImageHandler}>
              {previewUrl && previewUrl === props.image && (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${previewUrl}`}
                  alt="Preview"
                />
              )}
              {previewUrl && previewUrl !== props.image && (
                <img src={previewUrl} alt="Preview" />
              )}
              {!previewUrl && <p>Please pick an image.</p>}
            </div>
          )}
          <Button
            div
            type="button"
            onClick={props.modal ? showModalHandler : pickImageHandler}
          >
            {props.children}
          </Button>
        </div>
        {!isValid && <p>{props.errorText}</p>}
      </div>
    </>
  );
};

export default ImageUpload;

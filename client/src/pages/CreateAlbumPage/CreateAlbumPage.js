import React, { Fragment, useState } from "react";
import { GrUpload } from "react-icons/gr";

const CreateAlbumPage = () => {
  const [selectFiles, setSelectFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      console.log(false);
      return false;
    }

    console.log(true);
    return true;
  };

  const handleFiles = (files) => {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        console.log(true);
      } else {
        files[i]["invalid"] = true;
        setSelectFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
      }
    }
  };

  return (
    <div className="layout-flat__body create-album">
      <div>
        <span>Create Album</span>
      </div>
      <div className="drop-zone">
        <div
          className="drop-zone__upload"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <GrUpload className="heading-0 " />
          <span className="heading-2">
            Drag and Drop files here or click to upload
          </span>
        </div>
        <div className="drop-zone__display">test</div>
      </div>
    </div>
  );
};

export default CreateAlbumPage;

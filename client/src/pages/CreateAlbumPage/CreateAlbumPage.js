import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { GrUpload } from "react-icons/gr";
import {useHistory} from 'react-router-dom';
import { createAlbumService } from "../../services/albumService";

const CreateAlbumPage = ({ token }) => {
  const history = useHistory();
  const [albumName, setAlbumName] = useState("");
  const [accessUser, setAccessUser] = useState(false);

  const [selectedFiles, setSelectFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name == current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

  const handleCreateAlbum = async () => {
    if (unsupportedFiles.length === 0 && albumName) {
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("accessUser", accessUser);

      for (let i = 0; i < validFiles.length; i++) {
        formData.append("albumfiles", validFiles[i]);
      }
      const albumId = await createAlbumService(token, formData);

      history.push(`/albums`)

    }
  };

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
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };

  const removeFile = (name) => {
    const validFilesIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFilesIndex, 1);
    setValidFiles([...validFiles]);

    const selectedFilesIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFilesIndex, 1);
    setSelectFiles([...selectedFiles]);

    const unsupportedFilesIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    );
    if (unsupportedFiles !== -1) {
      unsupportedFiles.splice(unsupportedFilesIndex, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  return (
    <div className="layout-flat__body create-album">
      <div>
        <span className="heading-2">Create Album</span>
      </div>
      <div
        onClick={handleCreateAlbum}
        className={`${
          unsupportedFiles.length > 0 || !albumName
            ? "create-album--upload-button__disabled"
            : "create-album--upload-button"
        } heading-2`}
      >
        + Create Album
      </div>
      {unsupportedFiles.length > 0 && (
        <div className="heading-3">Please remove all unsupported files</div>
      )}

      <input
        className="create-album--name-input"
        value={albumName}
        placeholder="album name"
        onChange={(e) => setAlbumName(e.target.value)}
      />
      <div className="create-album__access">
        <input
          className="create-album__access--checkbox"
          id="requiredAccess"
          name="required-access"
          type="checkbox"
          onChange={(e) => setAccessUser(!accessUser)}
        />
        <label
          className="heading-3 create-album__access--label"
          for="required-access"
        >
          Anyone can upload photos
        </label>
      </div>

      <div className="drop-zone">
        <div
          className="drop-zone__upload"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={handleUploadClick}
        >
          <GrUpload className="heading-0 " />
          <span className="heading-2">
            Drag and Drop files here or click to upload
          </span>
          <input
            className="drop-zone__upload--input"
            type="file"
            name="albumfiles"
            multiple
            ref={fileInputRef}
            onChange={filesSelected}
          />
        </div>
        <div className="drop-zone__display">
          {validFiles.map((file, i) => (
            <div className="drop-zone__display__status-bar">
              <div>
                <div className="drop-zone__display__status-bar--logo"></div>
                <div className="drop-zone__display__status-bar--type">
                  {fileType(file.name)}
                </div>
                <span className="drop-zone__display__status-bar--name">
                  {file.name}
                </span>
                <span className="drop-zone__display__status-bar--size">
                  {fileSize(file.size)}
                </span>
                {file.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
                <span onClick={() => removeFile(file.name)}>x</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(CreateAlbumPage);

import React, {useState, useEffect, useRef} from'react';
import { GrUpload } from "react-icons/gr";
import {TiDeleteOutline} from 'react-icons/ti';



const DropZone = ({validFiles, setValidFiles, unsupportedFiles, setUnsupportedFiles}) => {

    const [selectedFiles, setSelectFiles] = useState([]);
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
        <div className="drop-zone__uploaded-images">
          {validFiles.map((file, i) => (
            <div className="drop-zone__uploaded-images__tag heading-3">
                
                
                <span className="drop-zone__uploaded-images__tag--name">
                  {file.name}
                </span>
                <span className="drop-zone__uploaded-images__tag--size">
                {' '}{fileSize(file.size)}
                </span>
                {file.invalid && (
                  <span className="drop-zone__uploaded-images__tag--file-error-message"> ({errorMessage})</span>
                )}
                <span className="heading-4 drop-zone__uploaded-images__tag--delete" onClick={() => removeFile(file.name)}>x</span>
              
            </div>
          ))}
        </div>
      </div>
    )

}

export default DropZone;
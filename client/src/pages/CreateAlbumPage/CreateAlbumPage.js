import React, { useState } from "react";
import { connect } from "react-redux";

import {useHistory} from 'react-router-dom';
import { createAlbumService } from "../../services/albumService";
import DropZone from "../../components/DropZone/DropZone";

const CreateAlbumPage = ({ token }) => {
  const history = useHistory();
  const [albumName, setAlbumName] = useState("");
  const [accessUser, setAccessUser] = useState(false);

  //These are needed to pass down to the DropZone component
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);


  const handleCreateAlbum = async () => {
    if (unsupportedFiles.length === 0 && albumName && validFiles.length > 0) {
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("accessUser", accessUser);

      for (let i = 0; i < validFiles.length; i++) {
        formData.append("albumfiles", validFiles[i]);
      }
      await createAlbumService(token, formData);

      history.push(`/albums`)
    }
  };
  
  return (
    <div className="layout-flat__body create-album">
      <div>
        <span className="heading-2__bold">Create Album</span>
      </div>
      <div
        onClick={handleCreateAlbum}
        className={`${
          unsupportedFiles.length > 0 || !albumName
            ? "create-album--upload-button__disabled"
            : "create-album--upload-button"
        } heading-3`}
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
      <DropZone validFiles={validFiles} setValidFiles={setValidFiles} unsupportedFiles={unsupportedFiles} setUnsupportedFiles={setUnsupportedFiles}/>

    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(CreateAlbumPage);

import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { RiDeleteBin7Line } from "react-icons/ri";
import spinner from "../../images/spinner1.gif";

import {
  addPhotosService,
  deleteAlbumService,
  deletePhotoService,
  getAlbumService,
} from "../../services/albumService";
import DropZone from "../../components/DropZone/DropZone";

const AlbumPage = ({ token, user }) => {
  let history = useHistory();
  const [fetching, setFetching] = useState(false);
  const [albumName, setAlbumName] = useState();
  const [photos, setPhotos] = useState([]);
  const [accessLevel, setAccessLevel] = useState(5);
  const [addPhotos, setAddPhotos] = useState(false);

  //These are needed to pass down to the DropZone component
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  const { albumId } = useParams();

  useEffect(() => {
    (async function () {
      setFetching(true);
      const albumPhotos = await getAlbumService(token, albumId);
      if (albumPhotos) {
        setAlbumName(albumPhotos.name);
        setPhotos(albumPhotos.photos);
        if (albumPhotos.requiredAccess < 5) {
          setAccessLevel(0);
        }
      }
      setFetching(false);
    })();
  }, [addPhotos, setAddPhotos]);

  const handleDeleteAlbum = async () => {
    const { acknowledgement } = await deleteAlbumService(token, albumId);

    if (acknowledgement) {
      history.push("/albums");
    }
  };

  const handleDeletePhoto = async (photoId) => {
    const { acknowledgement } = await deletePhotoService(token, photoId);
    if (acknowledgement) {
      const photoIndex = photos.findIndex((photo) => photo._id === photoId);
      photos.splice(photoIndex, 1);
      setPhotos([...photos]);
      setValidFiles([]);
    }
  };

  const handleUploadPhotos = async () => {
    if (unsupportedFiles.length === 0 && validFiles.length > 0) {

      const formData = new FormData();
      for( let i = 0; i < validFiles.length; i++) {
          formData.append('photos', validFiles[i]);
      }
      const newPhotos = await addPhotosService(token, albumId, formData);
      setValidFiles([]);
      setAddPhotos(false);
    }
  };

  if(fetching) {
    return (
      <div className="spinner-wrapper-2">
      <img src={spinner} className="spinner-1 " />
    </div>
    )
    
  }

  return (
    <div className="layout-flat__body album">
      <div className="album__header">
        <div className="heading-2">{albumName} - Photo Album</div>
        {user.admin >= 5 && (
          <div onClick={handleDeleteAlbum} className="album--delete heading-3">
            delete album
          </div>
        )}
      </div>
      {(accessLevel < 5 || user.admin == 5) && (
        <div className="album__upload-image">
          <div
            onClick={() => setAddPhotos(!addPhotos)}
            className="album__upload-image--button heading-3"
          >
            {!addPhotos ? <span>add more photos</span> : <span>hide</span>}
          </div>

          {addPhotos && (
            <Fragment>
              <div
                onClick={handleUploadPhotos}
                className={`${
                  unsupportedFiles.length > 0 || validFiles.length === 0
                    ? "album__upload-image--upload-button__disabled"
                    : "album__upload-image--upload-button"
                } heading-2`}
              >
                upload
              </div>
              {unsupportedFiles.length > 0 && (
                <div className="heading-3">
                  Please remove all unsupported files
                </div>
              )}
              <DropZone
                validFiles={validFiles}
                setValidFiles={setValidFiles}
                unsupportedFiles={unsupportedFiles}
                setUnsupportedFiles={setUnsupportedFiles}
              />
            </Fragment>
          )}
        </div>
      )}

      {photos && photos.length > 0 && (
        <div className="album__photos-container">
          {photos.map((photo) => (
            <div className="album__photos-container__photo">
              <img
                className="album__photos-container__photo--image"
                src={photo.image}
              />
              <RiDeleteBin7Line
                className="album__photos-container__photo--trash"
                onClick={() => handleDeletePhoto(photo._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(AlbumPage);

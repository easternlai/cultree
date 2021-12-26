import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RiDeleteBin7Line } from 'react-icons/ri';

import { deleteAlbumService, getAlbumService } from "../../services/albumService";

const AlbumPage = ({ token, user }) => {
  const [albumName, setAlbumName] = useState();
  const [photos, setPhotos] = useState([]);
  const [adminOnly, setAdminOnly] = useState(true);

  const { albumId } = useParams();

  useEffect(() => {
    (async function () {
      const albumPhotos = await getAlbumService(token, albumId);
      setAlbumName(albumPhotos.name);
      setPhotos(albumPhotos.photos);
      if (albumPhotos.requiredAccess < 5) {
        setAdminOnly(false);
      }
    })();
  }, []);

  const handleDelete =() => {
      deleteAlbumService(token, albumId);
  }
  return (
    <div className="layout-flat__body album">
      <div className="heading-2">{albumName} - Photo Album</div>
      {user.admin >= 5 && (
          <div onClick={handleDelete}className="album--delete heading-3">delete album</div>
      )}
      {photos.length > 0 && (
        <div  className="album__photos-container">
          {photos.map((photo) => (
            <div className="album__photos-container__photo">
                <img onClick={()=>console.log('test2')} className="album__photos-container__photo--image" src={photo.image} />
                <RiDeleteBin7Line className="album__photos-container__photo--trash" onClick={()=>console.log('click')}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.currentUser
});

export default connect(mapStateToProps)(AlbumPage);

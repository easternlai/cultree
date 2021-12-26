import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { getAlbumsService } from "../../services/albumService";

const AlbumPage = ({ user }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async function () {
      setAlbums(await getAlbumsService(user.token));
    })();
  }, []);


  return (
    <div className="layout-flat__body albums">
      <div>
        <span className="heading-2__bold">Albums</span>
      </div>
      <div className="albums__list">
        {user.currentUser.admin >= 5 && (
          <div className="albums__list__item">
              <Link className="no-dec" to="/createalbum">
            <div className="albums__list__item__blank albums__list__item--image">
              <span className="heading-1 albums__list__item__blank--icon">
                +
              </span>
            </div>
            </Link>
            <span className="albums__list__item--name heading-4">
              Create Album
            </span>
          </div>
        )}
        {albums.map((album) => (
          <Link to={`/albums/${album._id}`} className="albums__list__item no-dec">
            {album.cover ? (
              <img className="albums__list__item--image" src={album.cover} />
            ) : (
              <div className="albums__list__item__blank albums__list__item--image"></div>
            )}
            <div className="albums__list__item--name heading-4">{album.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AlbumPage);

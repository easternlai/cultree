import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAlbumsService } from "../../services/albumService";
import spinner from "../../images/spinner1.gif";

const AlbumPage = ({ user }) => {
  const [albums, setAlbums] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    (async function () {
      setFetching(true);
      setAlbums(await getAlbumsService(user.token));
      setFetching(false);
    })();
  }, []);

  if (fetching) {
    return (
      <div className="spinner-wrapper-2">
        <img src={spinner} className="spinner-1" />
      </div>
    );
  }

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
              <div className="albums__list__item--name heading-4">
                Create Album
              </div>
            </Link>
          </div>
        )}
        {albums.map((album) => (
          <div className="albums__list__item">
            <Link to={`/albums/${album._id}`} className=" no-dec">
              {album.cover ? (
                <img className="albums__list__item--image" src={album.cover} />
              ) : (
                <div className="albums__list__item__blank albums__list__item--image"></div>
              )}
              <div className="albums__list__item--name heading-4">
                {album.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AlbumPage);

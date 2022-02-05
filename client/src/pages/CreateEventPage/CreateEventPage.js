import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import spinner from "../../images/spinner1.gif";
import { createEvent, yelpSearch } from "../../services/eventServices";

const CreateEventPage = ({ token }) => {
  const [fetching, setFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [businesses, setBusinesses] = useState(undefined);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [caption, setCaption] = useState("");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createEvent(
      token,
      "standard",
      name,
      venue,
      address,
      String(moment(dateTime).format("M/D")),
      String(moment(dateTime).format("h:mma")),
      caption,
      image
    );
    setName("");
    setDateTime("");
    setCaption("");
    setImage("");
    setVenue("");
    setSearch("");
    setBusinesses("");
    setAddress("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setFetching(true);
    (async function () {
      const allBusinesses = await yelpSearch(search);
      setFetching(false);
      if (allBusinesses) {
        setBusinesses(allBusinesses.slice(0, 1));
      }
    })();
  };

  return (
    <div className="layout-flat__body create-event">
      <div className="heading-2 bold">Create Event</div>

      <div className="create-event__search">
        <div className="create-event__search--heading">
          <span className="heading-3">Find Venue</span>
        </div>
        <div className="create-event__search__field">
          <input
            type="text"
            className="create-event__search__field--input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search venue"
          />
          <div
            className="create-event__search__field--submit"
            onClick={handleSearchSubmit}
          >
            Search
          </div>
        </div>
      </div>

      {!businesses && fetching && <img className="spinner-2" src={spinner} />}

      {businesses && (
        <div className="create-event__yelp">
          {businesses.map((business, idx) => (
            <div className="create-event__yelp__item">
              <img
                className="create-event__yelp__item--img"
                src={business.image_url}
              />
              <div className="heading-2">{business.name}</div>
              <div
                className="create-event__yelp__item--select heading-3"
                onClick={() => {
                  setVenue(business.name);
                  setImage(business.image_url);
                  setAddress(
                    business.location.address1 +
                      " " +
                      business.location.address2 +
                      " " +
                      business.location.address3 +
                      " " +
                      business.location.city
                  );
                }}
              >
                Select
              </div>
            </div>
          ))}
        </div>
      )}

      <form className="create-event__form" onSubmit={handleSubmit}>
        <DateTimePicker
          className="create-event__form--input create-event__form--date-time"
          onChange={setDateTime}
          value={dateTime}
        />

        <input
          type="text"
          className="create-event__form--input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="event name"
          maxLength="50"
        />
        <input
          type="text"
          className="create-event__form--input"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="venue"
          maxLength="30"
        />

        <input
          type="text"
          className="create-event__form--input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
          maxLength="30"
        />

        <textarea
          type="text"
          className="create-event__form--input textarea-styles"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="caption"
          maxLength="400"
        />

        <input
          type="submit"
          className="create-event__form--submit"
          value="Create Event"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(CreateEventPage);

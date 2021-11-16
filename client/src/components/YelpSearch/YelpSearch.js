import React, { useEffect, useState } from "react";
import { yelpSearch } from "../../services/eventServices";

const YelpSearch = ({ search, setVenue }) => {

  const [businesses, setBusinesses] = useState(undefined);

    (async function () {
        console.log(search);
        setBusinesses(await yelpSearch(search));
    })();
 

  return (
  <div>
      <div>test</div>
      {businesses && businesses.map((business)=> <div>{business.name}</div>
      )}
  </div>
  );
};

export default YelpSearch;

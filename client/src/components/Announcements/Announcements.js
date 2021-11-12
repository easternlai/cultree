import React from "react";

const SideBar = () => {
  return (
    <div className="layout-w-sidebar__sidebar announcements">
      <div className="heading-2__bold announcements--heading">
        Announcements
      </div>
      <div className="announcements__list">
        <div className="announcements__list__item">
          <div className="announcements__list__item--date heading-4__bold">
            10-2-2021
          </div>
          <div className="announcements__list__item--text heading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget
            mollis lacus. Vivamus scelerisque dui.
          </div>
        </div>

        <div className="announcements__list__item">
          <div className="announcements__list__item--date heading-4__bold">
            10-2-2021
          </div>
          <div className="announcements__list__item--text heading-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget
            mollis lacus. Vivamus scelerisque dui.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

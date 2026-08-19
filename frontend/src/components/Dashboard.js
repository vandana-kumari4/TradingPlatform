import React from "react";

import TopBar from "./TopBar";
import Menu from "./Menu";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <TopBar />
      <div className="dashboard-main">
        <Menu />
        <div className="content">
          <WatchList />
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
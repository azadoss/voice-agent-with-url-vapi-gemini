import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import RecentList from "./_components/RecentList";

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer/> */}
      {/* <h2 className='my-3 text-2xl font-bold'>Dashboard</h2> */}
      <CreateOptions />
      <RecentList />
    </div>
  );
}

export default Dashboard;

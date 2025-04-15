import React from "react";
import WelcomeContainer from "./_components/WelcomeContainer";
import CreateOptions from "./_components/CreateOptions";
import RecentList from "./_components/RecentList";

function Dashboard() {
  return (
    <div>
      {/* <WelcomeContainer/> */}
      <div className="mt-6 flex items-center justify-between flex-wrap">

      <h2 className='my-3 text-2xl font-bold'>Dashboard</h2>
      <CreateOptions />
      </div>
      <RecentList />
    </div>
  );
}

export default Dashboard;

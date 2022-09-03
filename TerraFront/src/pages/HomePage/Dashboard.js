// acrhive function
// reorder function
// filter to see interested users for a job
// filter to see intersted jobs for the (loggedIn) user

import React, { useEffect, useState } from "react";
import requests from "../../requests";
import { Link, useNavigate } from "react-router-dom";

import Card from "./Components/Card";

const Dashboard = (props) => {
  const [jobs, setJobs] = useState([]);

  useEffect(
    () => async () => {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      const { data } = await req.allJobs(token);
      setJobs(data);
    },
    []
  );

  // const jobHandler = (e) => {
  //   const token = window.localStorage.getItem("token");
  //   const req = requests.init(token);
  // };

  const remainingDays = (date) => {
    date = new Date(date);
    const currentDate = new Date();
    const days = date.getDate() - currentDate.getDate();
    return days;
  };

  const swap = (source, target) => {
    console.log("source", source, "\ntarget", target);

    (async () => {
      try {
        const token = window.localStorage.getItem("token");
        const req = requests.init(token);
        const data = await req.order(+source, +target);
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const markInterest = async (jobId) => {
    try {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      await req.mark(jobId);
    } catch (error) {
      console.log(error);
    }
  };

  const interestedUsers = async () => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <h2>DashBoard</h2>
      <br />
      <Link to={`/marked`}>Marked Jobs</Link>
      <ul onDragOver={(e) => e.preventDefault()}>
        {jobs.map((item) => {
          let color = "green";
          const daysRemaining = remainingDays(item.deadline);
          // console.log(daysRemaining, +daysRemaining > 14);
          if (+daysRemaining <= 14) color = "orange";
          else if (+daysRemaining <= 3) color = "red";
          return (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              description={item.description}
              color={color}
              order={item.order}
              swap={swap}
              mark={markInterest}
              interestedUsers={interestedUsers}
            />
          );
        })}
      </ul>
      {/* <button onClick={jobHandler}>Add Jobs</button> */}
      <Link to="/modal">Add Jobs</Link>
    </>
  );
};

export default Dashboard;

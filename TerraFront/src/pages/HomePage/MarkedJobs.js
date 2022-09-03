// acrhive function
// reorder function
// filter to see interested users for a job
// filter to see intersted jobs for the (loggedIn) user

import React, { useEffect, useState } from "react";
import requests from "../../requests";
import { Link, useNavigate } from "react-router-dom";

import Card from "./Components/Card";

const MarkedJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(
    () => async () => {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      const { data } = await req.markedJobs(token);
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

  const unMarkInterest = async (jobId) => {
    try {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      await req.unMark(jobId);
    } catch (error) {
      console.log(error);
    }
  };

  const previous = () => {
    navigate(-1);
  };

  return (
    <>
      <h2>MarkedJobs</h2>
      <br />
      <button onClick={previous}>Back to all</button>
      <ul>
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
              unmark={unMarkInterest}
            />
          );
        })}
      </ul>
      {/* <button onClick={jobHandler}>Add Jobs</button> */}
      <Link to="/modal">Add Jobs</Link>
    </>
  );
};

export default MarkedJobs;

// acrhive function
// reorder function
// filter to see interested users for a job
// filter to see intersted jobs for the (loggedIn) user

import React, { useEffect, useState } from "react";
import requests from "../../requests";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const InterestedUsers = (props) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(
    () => async () => {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      const {data} = await req.interestedUsers(params.jobId);
      console.log(data);
      setUsers(data);
    },
    []
  );

  const previous = () => {
    navigate(-1);
  };

  return (
    <>
      <h2>InterestedUsers</h2>
      <br />
      <button onClick={previous}>Back to all</button>
      <ul>
        {users.map((item) => (
          <li key={item?.email}>{item?.email}</li>
        ))}
      </ul>
    </>
  );
};

export default InterestedUsers;

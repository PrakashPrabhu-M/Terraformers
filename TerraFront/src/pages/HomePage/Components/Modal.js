import React, { useState } from "react";
import requests from "../../../requests";

import { Link, useNavigate } from "react-router-dom";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const value = e.target.value;
    const key = e.target.name;
    setData({ ...data, [key]: value });
  };

  const newJob = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const req = requests.init(token);
      await req.addJob(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.modal_content}>
      <div className={styles.modal_header}>
        <span className={styles.close}>&times;</span>
        <h2>{props.heading}</h2>
      </div>
      <div className={styles.modal_body}>
        <form>
          <label>Title: </label>
          <input
            required
            value={data.title}
            onChange={changeHandler}
            name="title"
            type="text"
          />
          <br />

          <label>Description: </label>
          <input
            required
            value={data.description}
            onChange={changeHandler}
            name="description"
            type="textarea"
          />
          <br />

          <label>Location: </label>
          <input
            required
            value={data.location}
            onChange={changeHandler}
            name="location"
            type="text"
          />
          <br />

          <label>Deadline: </label>
          <input
            required
            value={data.deadline}
            onChange={changeHandler}
            name="deadline"
            type="date"
          />
          <br />

          <label>Contact number: </label>
          <input
            required
            value={data.number}
            onChange={changeHandler}
            name="phno"
            type="text"
          />
          <br />

          <label>Contact email: </label>
          <input
            required
            value={data.email}
            onChange={changeHandler}
            name="email"
            type="textarea"
          />
          <br />
        </form>
      </div>
      <div className={styles.modal_footer}>
        <button onClick={newJob}>Add</button>
      </div>
    </div>
  );
};

export default Modal;

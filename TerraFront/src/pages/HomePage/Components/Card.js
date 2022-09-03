import React from "react";
import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card = (props) => {
  const dragStart = (e) => {
    console.log(props.order);
    e.dataTransfer.setData("order", props.order);
    console.log(e.dataTransfer);
  };

  const drop = (e) => {
    // console.log(e.dataTransfer.getData("order"));
    // console.log(props.order);
    const source = e.dataTransfer.getData("order");
    const target = props.order;
    props.swap(source, target);
  };

  return (
    <div
      draggable
      onDragStart={(e) => dragStart(e)}
      className={styles.card}
      style={{ "--color": `${props.color}` }}
      onDrop={(e) => drop(e)}
    >
      <div className={styles.container}>
        <h4>
          <b>{props.title}</b>
        </h4>
        <p>{props.description}</p>
        {props.mark ? (
          <button onClick={() => props.mark(props.id)}>Mark</button>
        ) : (
          <button onClick={() => props.unmark(props.id)}>UnMark</button>
        )}
        <Link to={`/interest/${props.id}`}>Interested users</Link>
      </div>
    </div>
  );
};

export default Card;

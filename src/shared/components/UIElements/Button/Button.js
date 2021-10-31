import React from "react";
import { Link } from 'react-router-dom';

import "./Button.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={
          props.dark
            ? `button button-dark ${props.classes}`
            : `button button-light ${props.classes}`
        }
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to || props.anchor) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={
          props.dark
            ? `button button-dark ${props.classes}`
            : `button button-light ${props.classes}`
        }
      >
        {props.children}
      </Link>
    );
  }

  if (props.div){
    return(
      <div
      className={
        props.dark
          ? `button button-dark ${props.classes}`
          : `button button-light ${props.classes}`
      }
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </div>
    )
  }

  return (
    <button
      className={
        props.dark
          ? `button button-dark ${props.classes}`
          : `button button-light ${props.classes}`
      }
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

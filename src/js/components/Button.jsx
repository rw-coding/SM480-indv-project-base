import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import "./Button.scss";
import classnames from "classnames";
import Icon from "./Icon";

function Button(props) {

  const handleClick = (e) => {
    console.log("Button -- handleClick: ", e);
    if(props.onClick) {
      props.onClick(props.id);
    }
  }

  return (
    <button
      className={classnames(
        "button",
        props.buttontype,
        { ["half"]: props.half },
        { ["full"]: props.full }
      )}
      onClick={handleClick}
    >
      {props.icon && <Icon type={props.icon} />}
      {props.children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  buttontype: PropTypes.oneOf(["primary", "secondary"]),
  icon: PropTypes.string,
  half: PropTypes.bool,
  full: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  buttontype: "primary",
};

export default Button;

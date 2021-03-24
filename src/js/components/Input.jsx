import React, { useState, useEffect } from "react";
import "./Input.scss";
import PropTypes from "prop-types";
import Icon from "./Icon";
function Input(props) {
  const { inputValue, setInputValue } = useState("");
  useEffect(
    (e) => {
      if (props.onUpdate) {
        props.onUpdate(e.target.value);
      }
    },
    [inputValue, props],
  );

  return (
    <div className='input'>
      {!!props.label && (
        <label htmlFor={props.id} className='input__label'>
          {props.label}
        </label>
      )}

      <input
        type={props.type}
        id={props.id}
        className='input__field'
        placeholder={props.placeholder}
        onChange={setInputValue}
        value={inputValue}
      />

      {!!props.error && (
        <div className='input__error'>
          <Icon type='error' />
          <div className='input__error-message'>{props.error}</div>
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onUpdate: PropTypes.func,
};

Input.defaultProps = {
  type: "text",
  placeholder: "Placeholder",
};

export default Input;

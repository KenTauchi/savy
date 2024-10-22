/* eslint-disable no-use-before-define */
import React from "react";
// import useAutocomplete from "@material-ui/lab/useAutocomplete";
import useAutocomplete from "./useAutocomplete";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import x_mark from "./closewindow-60px.svg";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    display: "block",
  },
  input: {
    width: 200,
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 10,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#eeeeee",
      //   color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#ffffff",
      color: "#eeeeee",
    },
  },
}));

const AutocompleteInput = (props) => {
  const classes = useStyles();
  let {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    class: "autocomplete-popup",
    options: props.options,
    getOptionLabel: (option) => option,
  });

  const { onChange } = getInputProps();
  const { onClick } = getOptionProps({ test: 1 });
  // console.log(getRootProps());
  // console.log(getOptionProps({ test: 1 }));
  // console.log(getRootProps().onKeyDown);

  return (
    <div className="autocompleteInput">
      <div 
        onKeyDown={props.keyDown}
        {...getRootProps()} 
        >
        <input
          className={classes.input}
          {...getInputProps()}
          placeholder={props.placeholder}
          onChange={(event) => {
            props.change(event);
            onChange(event);
          }}
          value={props.value}
        />
        {props.value ? (
          <img
            className="textClearMark"
            src={x_mark}
            onClick={props.clear}
          />
        ) : (
          null
        )}
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              onClick={(event) => {
                props.click(event);
                onClick(event);
              }}
             >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default AutocompleteInput;
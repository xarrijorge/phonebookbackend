import React from "react";

const AddContact = props => {
  return (
    <div>
      <div>
        <p>
          name:{" "}
          <input
            type="text"
            value={props.newName}
            onChange={props.handleName}
          />
        </p>
        <p>
          number:
          <input
            type="tel"
            value={props.newNumber}
            onChange={props.handleNumber}
          />
        </p>
      </div>
      <div>
        <button onClick={props.handleClick} disabled={props.buttonStatus}>
          add
        </button>
      </div>
    </div>
  );
};

export default AddContact;

import React from 'react';

const Person = ({person, toggleImportance, removeContact}) =>{
    const label = person.important ? 'not important' : 'important';
    return (
      <li className="person">
        {person.name} {person.number}
        <button onClick={toggleImportance}>{label}</button>
        <button onClick = {removeContact}>delete</button>
      </li>
    )
}

export default Person;
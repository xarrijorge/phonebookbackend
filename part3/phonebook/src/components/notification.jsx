import React from 'react';
import { tsPropertySignature } from '@babel/types';

const Notification = ({ message, messageClass }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={messageClass}>
        {message}
      </div>
    )
  }

  export default Notification;
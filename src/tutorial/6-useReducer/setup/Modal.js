import React, { useEffect } from 'react';

const Modal = ({ modalContent, closeModal }) => {
  useEffect(() => {
    const myTimeOut = setTimeout(() => closeModal(), 3000);
    return () => clearTimeout(myTimeOut);
  });

  return (
    <div className='modal'>
      { modalContent }
    </div>
  );
};

export default Modal;

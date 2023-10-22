import React from 'react';
import Modal from 'react-modal';

export function  SuccessModal ({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
    >
      <h2>Form Submitted Successfully</h2>
      <p>Your task has been created successfully.</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};
export function ErrorModal({ isOpen, onRequestClose }){
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Error Modal"
      >
        <h2>Error: Task Already Exists</h2>
        <p>The task you are trying to create already exists.</p>
        <button onClick={onRequestClose}>Close</button>
      </Modal>
    );
  };



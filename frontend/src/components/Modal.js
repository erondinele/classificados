// src/components/Modal.js
import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose} className="modal-close-btn">
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;

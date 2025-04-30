import React from "react";
import AuthForm from "./AuthForm";
import "../assets/styles/AuthModal.css";

const AuthModal = ({ onClose }) => {
  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <AuthForm onClose={onClose}/>
      </div>
    </div>
  );
};

export default AuthModal;

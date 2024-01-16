import React, { useState } from "react";
import './Modals.css';
import axios from "axios";

const ChangePasswordModal = () => {
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = localStorage.userId;
      const formData = new FormData(e.target);
      const oldPassword = formData.get("OldPassword");
      const newPassword = formData.get("NewPassword");
  
      const payload = {
        id,
        oldPassword,
        newPassword
      };
  
      try {
        const response = await axios.post('https://localhost:7211/Security/SetNewPassword', payload);
        setMessage(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Wystąpił błąd podczas zmiany hasła: " + error.message);
      }
    };
  
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          Zmień hasło
        </button>
  
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Zmiana hasła</h2>
              <form className="modal-form" onSubmit={handleSubmit}>
                <input name="OldPassword" type="password" placeholder="Stare hasło" />
                <input name="NewPassword" type="password" placeholder="Nowe hasło" />
                <input name="ConfirmNewPassword" type="password" placeholder="Powtórz nowe hasło" />
                <button className="modal-submit" type="submit">Zmień</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ChangePasswordModal;
import React, { useState } from "react";
import './Modals.css';
import axios from "axios";

const ChangeEmailModal = () => {
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');
  
    const toggleModal = () => {
      setModal(!modal);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = localStorage.userId;
      const formData = new FormData(e.target);
      const oldEmail = formData.get("OldEmail");
      const newEmail = formData.get("NewEmail");
      const password = formData.get("passwd");
  
      const payload = {
        id,
        password,
        oldEmail,
        newEmail
      };
  
      try {
        const response = await axios.post('https://localhost:7211/Security/SetNewEmail', payload);
        setMessage(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Wystąpił błąd podczas zmiany Email: " + error.message);
      }
    };
  
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          Zmień email
        </button>
  
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Zmień email</h2>
              <form className="modal-form" onSubmit={handleSubmit}>
                <input name="OldEmail" type="text" placeholder="Stary Email" />
                <input name="NewEmail" type="text" placeholder="Nowy Email" />
                <input name="passwd" type="password" placeholder="Potwierdź hasłem" />
                <button className="modal-submit" type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default ChangeEmailModal;
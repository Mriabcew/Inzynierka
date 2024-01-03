import React, { useState } from "react";
import './Modals.css';
import axios from "axios";

function ChangeEmailModal() {
    const [modal, setModal] = useState(false);
    const [Message, setMessage] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.id;
        const formData = new FormData(e.target);
        const OldEmail = formData.get("OldEmail");
        const NewEmail = formData.get("NewEmail");
        const password = formData.get("passwd");

        const payload = {
            id,
            password,
            OldEmail,
            NewEmail 
        };

        try {
            const response = await axios.post('https://localhost:7027/Security/SetNewEmail', payload)
            .then((response) => {
              setMessage(response.data);
            });
          }
          catch(error){
            console.error(error);
            setMessage("Wystąpił błąd podczas zmiany Email: " + error.message);
          }
        };
    

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Change email
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input name="OldEmail" type="text" placeholder="Old Email"/>
                            <input name="NewEmail" type="text" placeholder="New Email"/>
                            <input name="passwd" type="password" placeholder="Confirm with your password"/>
                            <button className="modal-submit" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}

        </>
    );
}
export default ChangeEmailModal;
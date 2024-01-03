import React, { useState } from "react";
import './Modals.css';
import axios from "axios";


function DeleteAccountModal() {
    const [modal, setModal] = useState(false);
    const [Message, setMessage] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.id;
        const formData = new FormData(e.target);
        const password = formData.get("passwd");

        const payload = {
            id,
            password,
        };
        console.log(payload);
        try {
            const response = await axios.post('https://localhost:7027/Security/DeleteAccount',payload)
            .then((response) => {
                setMessage(response.data);
              });
            }
            catch(error){
              console.error(error);
              setMessage("Wystąpił błąd podczas zmiany zdjecia: " + error.message);
            }
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Delete account
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Are you sure you want to delete your account?</h2>
                        <form onSubmit={handleSubmit}>
                        <input name="passwd" type="password" placeholder="Confirm with your password"/>
                        <button className="modal-submit" type="submit">Delete</button>
                        </form>
                        {Message && <div className="message">{Message}</div>}
                    </div>
                </div>
            )}

        </>
    );
}
export default DeleteAccountModal;

import React, { useState } from "react";
import './Modals.css';
import axios from "axios";

function DeleteAccountModal() {
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.userId;
        const formData = new FormData(e.target);
        const password = formData.get("passwd");

        const payload = {
            id,
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            password,
        };

        try {
            const response = await axios.post('https://localhost:7211/Security/DeleteAccount', payload);
            setMessage(response.data);
        } catch (error) {
            console.error(error);
            setMessage("Wystąpił błąd podczas usuwania konta: " + error.message);
        }
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Usuń konto
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Jesteś pewny, że chcesz usunąć konto?</h2>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input name="passwd" type="password" placeholder="Potwierdź hasłem" />
                            <button className="modal-submit" type="submit">Usuń</button>
                        </form>
                        {message && <div className="message">{message}</div>}
                    </div>
                </div>
            )}
        </>
    );
}

export default DeleteAccountModal;

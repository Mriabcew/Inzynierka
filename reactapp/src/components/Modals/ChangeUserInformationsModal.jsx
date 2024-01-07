import React, { useState } from "react";
import axios from "axios";
import './Modals.css';

function ChangeUserInformations() {
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.userId;
        const formData = new FormData(e.target);
        const firstName = formData.get("FirstName");
        const lastName = formData.get("Lastname");
        const phoneNumber = formData.get("phonenumber");
        const address = formData.get("address");
        const password = formData.get("passwd");

        const payload = {
            id,
            firstName,
            lastName,
            phoneNumber,
            address,
            password
        };

        try {
            const response = await axios.post('https://localhost:7211/Security/UserInfoSet', payload);
            setMessage(response.data);
        } catch (error) {
            console.error(error);
            setMessage("Wystąpił błąd podczas zmiany danych użytkownika: " + error.message);
        }
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal">
                Zmień dane użytkownika
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2>Zmień dane użytkownika</h2>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input name="FirstName" type="text" placeholder="Imię" />
                            <input name="Lastname" type="text" placeholder="Nazwisko" />
                            <input
                                name="phonenumber"
                                type="text"
                                placeholder="Numer telefonu"
                                pattern="[0-9]{9}"
                                title="Numer telefonu powinien składać się z 9 cyfr"
                                maxLength="9"
                            />
                            <input name="address" type="text" placeholder="Adres" />
                            <h2>Potwierdz hasłem</h2>
                            <input name="passwd" type="password" placeholder="Potwierdź hasłem" />
                            <button className="modal-submit" type="submit">Zastosuj</button>
                        </form>
                        {message && <div className="message" style={{padding:'1em'}}>{message}</div>}
                    </div>
                </div>
            )}

        </>
    );
}

export default ChangeUserInformations;
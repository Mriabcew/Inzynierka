import React, { useState } from "react";
import axios from "axios";
import './Modals.css';


function ChangeUserInformations() {
    const [modal, setModal] = useState(false);
    const [Message, setMessage] = useState('');

    const toggleModal = () => {
        setModal(!modal);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = localStorage.id;
        const formData = new FormData(e.target);
        const name = formData.get("Name");
        const surname = formData.get("Surname");
        const gender = formData.get("Gender");
        const password = formData.get("passwd");

        const payload = {
            id,
            name,
            surname,
            gender,
            password
        };

        try {

            axios.post('https://localhost:7027/Security/UserInfoSet', payload)
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
                Change user informations
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input name="Name" type="text" placeholder="Set name"/>
                            <input name="Surname" type="text" placeholder="Set surname"/>
                            <div className="gender-buttons">
                                <input name="Gender" type="radio" value="Man"/>
                                <label className="gender-label" for="Gender">Man</label>
                                <input name="Gender" type="radio" value="Woman"/>
                                <label className="gender-label" for="Gender">Woman</label>
                                <input name="Gender" type="radio" value="Not Defined"/>
                                <label className="gender-label" for="Gender">Not Defined</label>
                            </div>
                            <input name="passwd" type="password" placeholder="Confirm with your password"/>
                            <button className="modal-submit" type="submit">Submit</button>
                        </form>
                        {Message && <div className="message">{Message}</div>}
                    </div>
                    
                </div>
            )}

        </>
    );
}
export default ChangeUserInformations;
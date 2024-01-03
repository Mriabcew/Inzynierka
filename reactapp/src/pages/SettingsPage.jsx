import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Avatar } from '@mui/material';
import LogoBarComponent from '../components/LogoBarComponent';
import ChangeEmailModal from '../components/Modals/ChangeEmailModal';
import ChangeUserInformations from '../components/Modals/ChangeUserInformationsModal';
import DeleteAccountModal from '../components/Modals/DeleteAccountModal';

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
    firstname: '',
    lastname: '',
    address: '',
    phonenumber: '',
    avatar: '', // URL do avatara
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSaveSettings = () => {
    // Tutaj możesz dodać logikę do zapisywania ustawień użytkownika
    console.log('Zapisano ustawienia:', userData);
  };

  const handleButtonClick = (field) => {
    // Tutaj możesz dodać logikę do obsługi przycisków zmiany poszczególnych pól
    console.log(`Zmiana pola: ${field}`);
  };

  return (
    <div style={{ height: '100%' }}>
      <LogoBarComponent />
    <ChangeEmailModal/>
    <ChangeUserInformations/>
    <DeleteAccountModal/>
    </div>
  );
};

export default SettingsPage;

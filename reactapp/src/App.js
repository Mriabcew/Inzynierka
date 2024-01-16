import React, { Component } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import RegisterPage from './pages/RegisterPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/logo512.png';
import AddItemPage from './pages/AddItemPage';
import SettingsPage from './pages/SettingsPage';
import MyAuctionsPage from './pages/MyAuctionsPage';
import ItemPage from './pages/ItemPage';
import CategoryPage from './pages/CategoryPage';
import EditItemPage from './pages/EditItemPage';
import SearchResultPage from './pages/SearchResultPage';




export default class App extends Component {
    static displayName = App.name;

    
    render() {
      return(
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/add' element={<AddItemPage/>}/>
                <Route path='/settings' element={<SettingsPage/>}/>
                <Route path='/myAuctions' element={<MyAuctionsPage/>}/>
                <Route path="/Item/:itemId" element={<ItemPage/>} />
                <Route path="/kategoria/:categoryId" element={<CategoryPage/>}/>
                <Route path="/edit-auction/:itemId" element={<EditItemPage/>}/>
                <Route path="szukaj/:fraza" element={<SearchResultPage/>}/>
            </Routes>
       </BrowserRouter>
      )
    }
}

import React, { Component } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import RegisterPage from './pages/RegisterPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddItemPage from './pages/AddItemPage';



export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
      super(props)
    }

    render() {
      return(
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/add' element={<AddItemPage/>}/>
            </Routes>
       </BrowserRouter>
      )
    }
}

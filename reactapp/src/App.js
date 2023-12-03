import React, { Component } from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



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
            </Routes>
       </BrowserRouter>
      )
    }
}

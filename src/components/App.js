import { ThemeProvider } from '@material-ui/styles';
import React , {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';
import Deposit from './Deposit';
import History from './History';
import Transfer from './Transfer';
import Header from './ui/Header';
import theme from "./ui/Theme";
import Users from './Users';
// import './ui/App.css'
import './ui/History.css'
import LandingPage from './LandingPage';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';

import {RequireToken, fetchToken} from './Auth.js'


const App = () =>  {

  const [message, setMessage] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok){
      console.log("something messed up");
    }else{
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  const [value,setValue] = useState(0);
  const [selectedIndex,setSelectedIndex] = useState(0)
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          />
          <Routes>
          <Route  path='/'  
          element = {<LoginUser />}
          render={(props)=>(
                <LandingPage
                  {...props} 
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )} 
            />

          <Route  path='/home'  
          element = {<RequireToken><LandingPage /></RequireToken>}
          render={(props)=>(
                <LandingPage
                  {...props} 
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )} 
            />
          <Route  path='/users'  
          element = { <RequireToken> < Users/> </RequireToken>}
              render={(props)=>(
                <Users
                  {...props} 
                  setValue={setValue}
                  setSelectedIndex={setSelectedIndex}
                />
              )}
          />
          <Route  path='/history' element={ <RequireToken> <History /> </RequireToken> } />
          <Route  path='/transfer' element={ <RequireToken> < Transfer/> </RequireToken> } />
          <Route  path='/create' element={< CreateUser/>} />
          <Route  path='/login' element={< LoginUser/>} />
          <Route  path='/deposit' element={ <RequireToken> < Deposit/> </RequireToken> } />
          <Route  path='/contact' element={ <RequireToken> <ContactUs/> </RequireToken> } />

          </Routes>
          {/*

          <Route exact path='/about' component={AboutUs} /> */}
      
    </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;

import { useState } from 'react';
import './App.css'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import classes from './App.module.css'


const App = () => {

  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");

  return ( 
    <div className = {classes.container} data-theme = {theme}>
      <button className = {classes.color_mode_button} type = "button" onClick = {() => 
        setTheme((currentTheme) => (currentTheme === "dark" ? "" : "dark"))
        }
        >
          Change Color Palette
          </button>
      <SignUpPage/>
    </div>
  )
};

export default App;

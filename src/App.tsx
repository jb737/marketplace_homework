import { useState } from 'react';
import './App.css'
import SignUpPage from './pages/SignUpPage/SignUpPage'

//TODO: change mode button clicked, change mode across the app
//change mode works, no errors, console shows working, theme not applied. Troubleshoot

const App = () => {

  const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");

  return ( 
    <div data-theme = {theme}>
      <button type = "button" onClick = {() => 
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

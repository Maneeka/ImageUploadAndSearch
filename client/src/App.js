import React from "react"
import Home from './components/Home/Home'
import Results from './components/Results'
import {AppBar, Typography, Grow, Grid} from '@material-ui/core' 
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <AppBar position="static">
          <Typography variant="h3" align="center">Image Upload and Search App</Typography>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/posts/search" element={<Results/>} />
        </Routes>

    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;


//add auth(profile menu with login and logout and shit ig) to AppBar
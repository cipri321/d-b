import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {theme} from "./theme";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            {/*<Route path='/register' element={<RegisterPage/>} />*/}
            {/*<Route path="*" element={<PageNotFound/>} />*/}
          </Routes>

        </Router>

    </div>
  );
}

export default App;

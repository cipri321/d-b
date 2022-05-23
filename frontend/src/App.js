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
import RegisterPage from './pages/registerPage';
import Dashboard from "./pages/dashboard";
import ProfilePage from "./pages/ProfilePage";
import Grades from "./pages/grades";
import ContractPage from "./pages/contractPage";
import EnrollmentPage from "./pages/enrollment";
import AddOptionalsPage from "./pages/addOptionalsPage";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/profile' element={<ProfilePage/>} />
            <Route path='/grades' element={<Grades/>} />
            <Route path='/addOptionals' element={<AddOptionalsPage/>}/>
            <Route path='/contract' element={<ContractPage/>}/>
            <Route path='/enroll' element={<EnrollmentPage/>}/>
            {/*<Route path="*" element={<PageNotFound/>} />*/}
          </Routes>

        </Router>

      </div>
  );
}

export default App;
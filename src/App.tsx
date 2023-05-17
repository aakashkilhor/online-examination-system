import LoginForm from './components/Signin';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import SignupForm from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element = {<LoginForm/>}/>
        <Route path='/' element = {<SignupForm/>}/>
      </Routes>
    </Router>
        
  
  );
}

export default App;

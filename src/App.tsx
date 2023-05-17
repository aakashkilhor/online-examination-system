import LoginForm from './components/Signin';
import './App.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<LoginForm/>}/>
      </Routes>
    </Router>
        
  
  );
}

export default App;

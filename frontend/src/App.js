import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-bootstrap';
import 'react-bootstrap/Navbar';
import 'react-bootstrap/Nav';
import 'react-bootstrap/NavDropdown';
import 'react-bootstrap/Container';
import 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homeheader from './components/Homeheader';
import Homefooter from './components/Homefooter';
import Home from './components/Home';
import Cart from './components/Cart';


function App() {
  return (
  
      <Router>
        <Homeheader />
        <div className="headerbg">
        <Routes>
          <Route path="/" Component={Home} exact/>
              
          <Route path="/Shopping-Cart"  Component={Cart}/>
             
        </Routes>
        </div>
        <Homefooter/>
      </Router>

  );
}

export default App;

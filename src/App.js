import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Auth/Login';
import Homepage from './Pages/Website/Homepage';
import Register from './Pages/Auth/Register';
import Users from './Components/Dashboard/Users';

function App() {
  return (
    <div className="App">
      
        <Routes>
          {/** <Route path='/' element={<Homepage />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register/>}/>

          <Route path='/users' element={<Users/>}/>

          
        </Routes>
      
    </div>
  );
}

export default App;

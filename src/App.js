
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard';
import AddProfile from './Components/Admin/AddProfile';
// import AdminTopbar from './Components/Global/AdminTopbar';

function App() {
  return (
    <div className="App">   
    <Routes>
      <Route path='/login' element={<Login/>}  />
      {/* <Route path='/top' element={<AdminTopbar/>}  /> */}
      <Route path='/dashboard' element={<Dashboard/>}  />
      <Route path='/aprofile' element={<AddProfile/>}  />
    </Routes>
    </div>
  );
}

export default App;

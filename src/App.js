
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Admin/Login';
import Dashboard from './Components/Admin/Dashboard';
import AddProfile from './Components/Admin/AddProfile';
import { ThemeProvider } from '@emotion/react';
import theme from './Components/Custom/TypographyTheme';
import BlockProfile from './Components/Admin/BlockProfile';
import Task from './Components/Admin/Task';
import Manage from './Components/Admin/Manage';
import Register from './Components/Admin/Register';
import Testing from './Components/Admin/Testing';
// import AdminTopbar from './Components/Global/AdminTopbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
{/* <CssBaseline/> */}
    <div className="App">   
    <Routes>
      <Route path='/login' element={<Login/>}  />
      {/* <Route path='/top' element={<AdminTopbar/>}  /> */}
      <Route path='/dashboard' element={<Dashboard/>}  />
      <Route path='/aprofile' element={<AddProfile/>}  />
      <Route path="/block_profile" element={<BlockProfile/>}  />
      <Route path="/task" element={<Task/>}  />
      <Route path="/manage" element={<Manage/>}  />
      <Route path="/register" element={<Register/>}  />
      <Route path="/test" element={<Testing/>}  />
    </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;

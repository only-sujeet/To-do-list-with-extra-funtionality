
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Admin/Dashboard';
import AddProfile from './Components/Admin/AddProfile';
import { ThemeProvider } from '@emotion/react';
import theme from './Components/Custom/TypographyTheme';
import BlockProfile from './Components/Admin/BlockProfile';
import Task from './Components/Admin/Task';
import Manage from './Components/Admin/Manage';
import Register from './Components/Admin/Register';
import Testing from './Components/Admin/Testing';
import EmpLogin from './Components/Employee/EmpLogin';
import EmpHeader from './Components/Employee/EmpHeader';
import EmpTask from './Components/Employee/EmpTask';
import Tasks from './Components/Employee/Tasks';
import Submit from './Components/Employee/Submit';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import cookies from "js-cookie"
import Barchart from './Barchart';
import Login1 from './Components/Admin/Login1';
import { Bar } from 'react-chartjs-2'
import { UserData } from './data';
import { useState } from 'react';
import { chart } from 'chart.js/auto'
import Topbar from './Components/Global/Topbar';
import EditTask from './Components/Admin/EditTask';
import AdminTopbar from './Components/Global/AdminTopbar';
// import AdminTopbar from './Components/Global/AdminTopbar';

function App() {

  const { loginData } = useSelector(s => s.admin)

  useEffect(() => {
    { loginData && cookies.set('Token', loginData.token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) }) }
  }, [loginData]);

  const [userData, setuserData] = useState(
    {
      labels: UserData.map((data) => data.year),
      datasets: [{
        label: "userGain",
        data: UserData.map((data) => data.userGain)

      }]
    }
  );

  return (



    <ThemeProvider theme={theme}>
      {/* <CssBaseline/> */}
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login1 />} />
          <Route path='/top' element={<AdminTopbar/>}  />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/aprofile' element={<AddProfile />} />
          <Route path="/block_profile" element={<BlockProfile />} />
          <Route path="/task" element={<Task />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Testing />} />
          <Route path="/emplogin" element={<EmpLogin />} />
          <Route path="/header" element={<EmpHeader />} />
          <Route path="/emptask" element={<EmpTask />} />
          <Route path="/etask" element={<Tasks />} />
          <Route path="/edittask/:_id" element={<EditTask />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/chart" element={<Barchart charData={userData} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

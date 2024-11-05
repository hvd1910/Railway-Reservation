
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerRouter from './Routers/CustomerRouter';
import AdminRouter from './Routers/AdminRouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/*' element={<CustomerRouter/>}></Route>
        <Route path='/admin/*' element={<AdminRouter/>}></Route>
       
      </Routes>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';

import SignUp from './component/SignUp.tsx';
import SignIn from './component/SignIn.tsx';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import DashBoard from './component/dashboard/dashboard.tsx';
import AddProductComponent from './component/dashboard/addProduct.tsx';
import ViewProductComponent from './component/dashboard/viewProduct.tsx';






function App() {
  return (
     <Router>

      <Routes>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/signIp" element={<SignIn/>}/>
        {/* <Route path="/dashboard/*" element={<DashBoard />} /> */}
        <Route path="/dashboard/addProduct" element={<AddProductComponent/>}/>
        <Route path="/dashboard/viewProduct" element={<ViewProductComponent/>}/>

        </Routes>

    </Router>
  );
}

export default App;

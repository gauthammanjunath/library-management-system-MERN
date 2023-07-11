import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import './stylesheets/allignements.css';
import './stylesheets/custom.css';
import './stylesheets/sizes.css';
import './stylesheets/theme.css';
import './stylesheets/form-elements.css';
import ProtectedRoute from './components/ProtectedRoute';
import { useSelector } from 'react-redux';
import Loader from "./components/Loader";

function App() {
  const {loading}= useSelector((state)=> state.loaders);
  return (
    <div>

      {loading&& <Loader/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute ><Home/>
          </ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

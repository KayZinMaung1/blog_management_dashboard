
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import AuthRoute from './routers/AuthRoute';
import PirvateRoute from './routers/PrivateRoute';
import Login from '../src/pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<PirvateRoute><Login /></PirvateRoute>} />
        <Route path="/admin/*" element={<AuthRoute><Admin /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

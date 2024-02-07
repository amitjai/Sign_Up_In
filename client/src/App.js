import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import PublicRoute from './pages/PublicRouter';


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<PublicRoute><Home /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

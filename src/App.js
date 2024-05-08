import logo from './logo.svg';
import './App.css';
import AppRoutes from './components/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

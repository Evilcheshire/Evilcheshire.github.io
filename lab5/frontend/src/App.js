import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/general/Header';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ChefsPage from './pages/ChefsPage';
import AboutPage from './pages/AboutPage';
import ScrollToTop from './components/general/ScrollToTop';
import './assets/styles/style.css';

function App() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/chefs" element={<ChefsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
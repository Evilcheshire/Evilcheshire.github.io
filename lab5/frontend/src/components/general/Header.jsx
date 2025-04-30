import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import iconDark from '../../assets/images/icon_dark.png';
import AuthModal from '../AuthModal';
import { useAuth } from '../../AuthContext';

function Header() {
  const location = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const { user, logout } = useAuth();
  const path = location.pathname;

  let navLinks = [];

  switch (path) {
    case '/':
      navLinks = [
        { to: '/menu', label: 'Меню' },
        { to: '/chefs', label: 'Наші кухарі' },
        { to: '/about', label: 'Про нас' }
      ];
      break;
    case '/menu':
      navLinks = [
        { to: '/', label: 'Головна' },
        { to: '/chefs', label: 'Кухарі' },
        { to: '/about', label: 'Про нас' }
      ];
      break;
    case '/about':
      navLinks = [
        { to: '/', label: 'Головна' },
        { to: '/menu', label: 'Меню' },
        { to: '/chefs', label: 'Кухарі' }
      ];
      break;
    case '/chefs':
      navLinks = [
        { to: '/', label: 'Головна' },
        { to: '/menu', label: 'Меню' },
        { to: '/about', label: 'Про нас' }
      ];
      break;
    default:
      navLinks = [
        { to: '/', label: 'Головна' }
      ];
  }

  return (
    <header>
      <h1><img src={iconDark} alt="icon" />Селеста</h1>
      <nav>
        <ul>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          <li>
            {user ? (
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#468286"
                }}
              >
                Вийти
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#468286"
                }}
              >
                Вхід
              </button>
            )}
          </li>
        </ul>
      </nav>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
}

export default Header;

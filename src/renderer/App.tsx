import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import GetUser from './GetUser';
import AddUser from './AddUser';

function Hello() {
  return (
    <nav style={{ marginBottom: '20px', padding: '10px', textAlign: 'center' }}>
      <ul style={{ listStyleType: 'none', padding: '0', margin: '0', display: 'inline-block' }}>
        <li style={{ display: 'inline', margin: '0 15px' }}>
          <Link
            to="/"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: 'rgba(76, 175, 80, 0.5)', // Прозорий зелений фон
              fontWeight: 'bold',
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ display: 'inline', margin: '0 15px' }}>
          <Link
            to="/getuser"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: 'rgba(33, 150, 243, 0.5)', // Прозорий синій фон
              fontWeight: 'bold',
            }}
          >
            Page Get User
          </Link>
        </li>
        <li style={{ display: 'inline', margin: '0 15px' }}>
          <Link
            to="/adduser"
            style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: 'rgba(255, 87, 34, 0.5)', // Прозорий оранжевий фон
              fontWeight: 'bold',
            }}
          >
            Page Add User
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/getuser" element={<GetUser />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;

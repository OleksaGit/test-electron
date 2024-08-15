import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal} from "./Modal";
import {IUser} from "../interfaces/user.interface";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const AddUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, secondName, email, password }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. ${response.status} ${response.statusText}`);
      }

      const result: IUser = await response.json();
      setUser(result);
      setModalMessage('Users was success added');
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px', color: '#4CAF50' }}>Add User</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/')}
          style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#2196F3', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/getuser')}
          style={{ padding: '10px 20px', backgroundColor: '#FF5722', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Go to Get User
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="text"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          placeholder="Second Name"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            display: 'block',
            width: '100%',
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={AddUser}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#999' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </div>

      {user && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>User ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Second Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.userId}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.secondName}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
          </tr>
          </tbody>
        </table>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />
    </div>
  );
};

export default AddUser;

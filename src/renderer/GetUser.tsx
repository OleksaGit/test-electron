import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal} from "./Modal";
import {IUser} from "../interfaces/user.interface";

const GetUser: React.FC = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/get-user/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. ${response.status} ${response.statusText}`);
      }

      const result: IUser = await response.json();
      setUser(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePostRequest = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. ${response.status} ${response.statusText}`);
      }

      setModalMessage('Receiving token is successful')
      setIsModalOpen(true);

      const tokenObj: { access_token: string } = await response.json()
      setToken(tokenObj.access_token);

    } catch (error) {
      console.error('Error fetching data:', error);
      setModalMessage(error.message);
      setIsModalOpen(true);
    } finally {
      setFetchLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px', color: '#4CAF50' }}>Get User</h1>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '150px',
            }}
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/adduser')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#FF5722',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '150px',
            }}
          >
            Go to Add User
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px', color: '#FFC107' }}>Login</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
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
            placeholder="Enter password"
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
            onClick={handlePostRequest}
            disabled={fetchLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: fetchLoading ? '#999' : '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: fetchLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {fetchLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '15px', color: '#FFC107' }}>Get User by ID</h2>
        <div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter user ID"
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleFetchData}
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
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} />

      {user && (
        <div style={{ marginTop: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50' }}>User ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50' }}>First Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50' }}>Second Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#4CAF50' }}>Email</th>
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
        </div>
      )}
    </div>
  );

}


  export default GetUser;

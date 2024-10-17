import React, { useState, useEffect } from 'react';
import EmployeeGrid from './components/EmployeeGrid';
import './App.css';

function App() {
  const [employees, setEmployees] = useState(() => {
    // Load employees from local storage if available
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');

  const addEmployee = () => {
    if (employeeId && name && email && position && location) {
      const newEmployees = [...employees, { employeeId, name, email, position, location }];
      setEmployees(newEmployees);
      localStorage.setItem('employees', JSON.stringify(newEmployees)); // Save to local storage
      setEmployeeId('');
      setName('');
      setEmail('');
      setPosition('');
      setLocation('');
    }
  };

  return (
    <div className="App">
      <h2>Employee CRUD Application</h2>
      <div className="form">
        <input 
          type="text" 
          placeholder="Employee ID" 
          value={employeeId} 
          onChange={(e) => setEmployeeId(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Position" 
          value={position} 
          onChange={(e) => setPosition(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
        <button className="add-btn" onClick={addEmployee}>Add Employee</button>
      </div>
      <EmployeeGrid employees={employees} setEmployees={setEmployees} />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Login, Register } from './components/auth/Login';
import { DoctorModule } from './components/modules/DoctorModule/DoctorModule';
import { LabModule } from './components/modules/LabModule/LabModule';
import { PharmacyModule } from './components/modules/PharmacyModule/PharmacyModule';
import { AdminModule } from './components/modules/AdminModule/AdminModule';

export type UserRole = 'doctor' | 'lab' | 'pharmacy' | 'admin';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLogin = (authenticatedUser: User) => {
    setUser(authenticatedUser);
  };

  const handleRegister = (registeredUser: User) => {
    setUser(registeredUser);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoginView(true); // Reset to login view when logging out
  };

  // Show authentication views if user is not logged in
  if (!user) {
    return isLoginView ? (
      <Login 
        onLogin={handleLogin} 
        onSwitchToRegister={() => setIsLoginView(false)} 
      />
    ) : (
      <Register 
        onRegister={handleRegister} 
        onSwitchToLogin={() => setIsLoginView(true)} 
      />
    );
  }

  // Render appropriate module based on user role
  switch (user.role) {
    case 'doctor':
      return <DoctorModule user={user} onLogout={handleLogout} />;
    case 'lab':
      return <LabModule user={user} onLogout={handleLogout} />;
    case 'pharmacy':
      return <PharmacyModule user={user} onLogout={handleLogout} />;
    case 'admin':
      return <AdminModule user={user} onLogout={handleLogout} />;
  }
}

export default App;
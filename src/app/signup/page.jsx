import React from 'react';
import Signup from './components/SignUp.jsx';
import { Toaster } from './components/toaster';
import { ToastProvider } from './components/toast';

const App = () => {
  return (
    <ToastProvider>
      <Toaster />
      <Signup />
    </ToastProvider>
  );
};

export default App;
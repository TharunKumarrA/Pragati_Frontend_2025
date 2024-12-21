import React from 'react';
import Signup from './components/SignUp.jsx';
import { Toaster } from '@/app/toast/toaster';
import { ToastProvider } from '@/app/toast/toast';

const App = () => {
  return (
    <ToastProvider>
      <Toaster />
      <Signup />
    </ToastProvider>
  );
};

export default App;
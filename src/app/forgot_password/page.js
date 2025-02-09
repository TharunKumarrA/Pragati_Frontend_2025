import ForgotPassword from "./components/forgot_password.jsx";
import { Toaster } from '@/app/_toast/toaster';
import { ToastProvider } from '@/app/_toast/toast';

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <ToastProvider>
        <Toaster />
        <ForgotPassword />
      </ToastProvider>
    </main>
  );
}
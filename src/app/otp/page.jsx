import Otp from "./component/otp";
import { Toaster } from '@/app/toast/toaster';
import { ToastProvider } from '@/app/toast/toast';

export default function Page() {
return (
<main>
    <ToastProvider>
    <Toaster />
        <Otp />
    </ToastProvider>
</main>
);
}

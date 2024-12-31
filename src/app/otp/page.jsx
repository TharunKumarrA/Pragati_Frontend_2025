import Otp from "./component/otp";
import { Toaster } from '@/app/_toast/toaster';
import { ToastProvider } from '@/app/_toast/toast';

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

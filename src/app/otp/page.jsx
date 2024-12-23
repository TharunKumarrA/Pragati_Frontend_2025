import Otp from "./component/otp";
import { Toaster } from './component/toaster';
import { ToastProvider } from './component/toast';

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

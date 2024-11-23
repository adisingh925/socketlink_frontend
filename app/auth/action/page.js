// app/login/page.js
import { Suspense } from 'react';
import UpdatePassword from './form';

export default function SignupPage() {
    return (
        <main>
            <Suspense fallback={
                <div className="flex items-center justify-center h-[100dvh] bg-gray-900 text-white">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
                    </div>
                </div>
            }>
                <UpdatePassword />
            </Suspense>
        </main>
    );
}

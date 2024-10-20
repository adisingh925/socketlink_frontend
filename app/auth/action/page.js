// app/login/page.js
import { Suspense } from 'react';
import UpdatePassword from './form';

export default function SignupPage() {
    return (
        <main>
            <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
                <UpdatePassword />
            </Suspense>
        </main>
    );
}

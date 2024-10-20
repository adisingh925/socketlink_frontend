// app/login/page.js
import { Suspense } from 'react';
import UpdatePassword from './form';

export default function SignupPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <UpdatePassword />
            </Suspense>
        </main>
    );
}

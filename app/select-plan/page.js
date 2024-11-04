// app/login/page.js
import { Suspense } from 'react';
import SelectWebSocketPlan from './form';

export default function SignupPage() {
    return (
        <main>
            <Suspense>
                <SelectWebSocketPlan />
            </Suspense>
        </main>
    );
}

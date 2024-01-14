'use client'

import { authenticate } from '../lib/actions'
import { useFormState } from 'react-dom'

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    return (
        <main className="flex flex-col items-center justify-between p-24">
        <form action={dispatch}>
            <input type="text" name='login' />
            <input type="password" name='password'/>
            <input type="submit" />
        </form>
        </main>
    )
}

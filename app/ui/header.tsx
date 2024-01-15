import Link from "next/link"
import LiginBtn from '@/app/components/login-btn'
import { SessionProvider } from "next-auth/react"

export default function Header(){
    return (
        <nav className="flex justify-center py-3">
            <SessionProvider>
                <ul className="flex gap-3">
                    <li><Link href="">Главная</Link></li>
                    <li><Link href="">Мой кабинет</Link></li>
                    <li><p>en/ru</p></li>
                    <LiginBtn></LiginBtn>
                </ul>
            </SessionProvider>
        </nav>
    )
}
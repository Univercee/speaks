import Link from "next/link"

export default function Header(){
    return (
        <nav className="flex justify-center py-3">
            <ul className="flex gap-3">
                <li><Link href="">Главная</Link></li>
                <li><Link href="">Мой кабинет</Link></li>
                <li><p>en/ru</p></li>
            </ul>
        </nav>
    )
}
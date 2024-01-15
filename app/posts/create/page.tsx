'use client'
import { useFormState } from "react-dom"
import { createPost } from "@/app/lib/actions"

export default function Page(){
    const initialState = {};
    const [state, dispatch] = useFormState(createPost, initialState);
    
    return (
        <form action={dispatch} className="flex flex-col items-center gap-3">
            <div className="flex flex-col">
                <label htmlFor="title">Заголовок</label>
                <input className="border" type="text" name="title" id="title" required/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Описание</label>
                <textarea className="border" name="description" id="description" cols={30} rows={10}></textarea>
            </div>
            <button className="border" type="submit">Создать</button>
        </form>
    )
}
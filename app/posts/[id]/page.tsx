import { fetchPostById } from "@/app/lib/data"

export default async function Page({params}: {
    params: {id: string}
}){
    const post = await fetchPostById(params.id);
    return (
        <div>
            <h1>Post id: {params.id}</h1>
            <p>{post.title}</p>
            <p>{post.description}</p>
        </div>
    )
}
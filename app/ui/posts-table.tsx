import { fetchPosts } from "../lib/data"

export default async function PostsTable(){
    const posts = await fetchPosts();
    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => (
                <div>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    <p>{post.user}</p>
                    <p>{post.date}</p>
                </div> 
            ))}
        </div>
    )
}
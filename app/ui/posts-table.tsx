import Link from "next/link";
import { fetchPosts } from "../lib/data"
import { deletePost } from "../lib/actions";

export default async function PostsTable(){
    const posts = await fetchPosts();
    return (
        <div className="flex flex-col gap-4">
            {posts.map(post => {
                const deletePostWithId = deletePost.bind(null, post.id);
                return (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        <p>{post.user}</p>
                        <p>{post.date}</p>
                        <Link className="border" href={`/posts/${post.id}`}>To post</Link>
                        <form action={deletePostWithId}>
                            <button type="submit">Delete</button>
                        </form>
                    </div> 
                )
            })}
        </div>
    )
}
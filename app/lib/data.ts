import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { PostRaw } from "./definitions";

export async function fetchPosts(){
    noStore();
    try {
        const data = await sql<PostRaw>`
            SELECT speaks_users.login as user, speaks_posts.*  FROM speaks_posts
            JOIN speaks_users ON speaks_posts.user_id = speaks_users.id
            ORDER BY speaks_posts.date DESC
        `;
        const posts = data.rows.map((post) => ({
            ...post,
            date: post.date.toISOString().split('T')[0],
          }));
        return posts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Posts.');
    }
}
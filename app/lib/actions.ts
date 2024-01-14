import { sql } from "@vercel/postgres";
import { z } from 'zod';

const formSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.string()
})

const CreatePost = formSchema.omit({id: true, date: true});

export type State = {
    errors?: {
        title?: string[],
        description?: string[]
    },
    message?: string | null
};

export async function createPost(formData: FormData){
    const validatedFields  = CreatePost.safeParse({
        userId: formData.get('userId'),
        title: formData.get('title'),
        description: formData.get('description')
    });

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.'
        };
    }

    const { userId, title, description } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0]

    try {
        const posts = await sql`SELECT * FROM POSTS`;
        return posts;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Posts.');
    }
}
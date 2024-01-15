'use server'

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { auth } from "@/auth"

const formSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string({
        required_error: "The title field is required"
    }),
    description: z.string({
        required_error: "The description field is required"
    }),
    date: z.string()
})

const CreatePost = formSchema.omit({id: true, date: true, userId: true});

export type State = {
    errors?: {
        title?: string[],
        description?: string[]
    },
    message?: string | null
};

export async function createPost(prevState: State, formData: FormData){
    const session = await auth();
    
    const validatedFields  = CreatePost.safeParse({
        title: formData.get('title'),
        description: formData.get('description')
    });

    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post.'
        };
    }

    const { title, description } = validatedFields.data;
    const date = new Date().toISOString();
    const userId = session?.user.id;

    try {
        await sql`
            INSERT INTO speaks_posts(user_id, title, description, date)
            VALUES(${userId}, ${title}, ${description}, ${date})
        `;
    } catch (error) {
        console.log(error);
        
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }
    revalidatePath('/posts');
    redirect('/posts')
}

export async function deletePost(id: string){
    const session = await auth();
    const userId = session?.user.id;

    try {
        await sql`
            DELETE FROM speaks_posts WHERE id = ${id} AND user_id = ${userId}
        `;
        revalidatePath('/posts');
        return {
            message: 'Post deleted'
        }
    } catch (error) {
        return {
            message: `Database Error: Failed to delete Post<${id}>`,
        };
    }
}

export async function authenticate(prevState: string|undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}
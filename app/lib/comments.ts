import { supabase } from "./supabase";
import { Comment, commentSchema } from "./schema";

export async function getCommentsFromDB(): Promise<Comment[]> {
    const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map((c) =>
        commentSchema.parse({
            id: c.id,
            author: c.author,
            content: c.content,
            createdAt: c.created_at + "Z",
        })
    );
}

export async function addCommentToDB(comment: Omit<Comment, "createdAt">) {
    const { data, error } = await supabase
        .from("comments")
        .insert({
            id: comment.id,
            author: comment.author,
            content: comment.content,
        })
        .select()
        .single();

    if (error) throw error;

    return commentSchema.parse({
        id: data.id,
        author: data.author,
        content: data.content,
        createdAt: data.created_at,
    });
}

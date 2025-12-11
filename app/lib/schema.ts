import { z } from "zod";

export const commentSchema = z.object({
    id: z.string(),
    author: z.string().min(1, "El autor es requerido"),
    content: z.string().min(1, "El comentario es requerido"),
    createdAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;

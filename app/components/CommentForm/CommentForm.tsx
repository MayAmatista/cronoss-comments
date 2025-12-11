"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addCommentToDB } from "../../lib/comments";
import { commentSchema } from "../../lib/schema";
import styles from "./CommentForm.module.css";

export default function CommentForm() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const optimisticComment = {
      id: uuid(),
      author,
      content,
      createdAt: new Date().toISOString(),
    };

    window.dispatchEvent(
      new CustomEvent("new-comment", { detail: optimisticComment })
    );

    try {
      commentSchema.parse(optimisticComment);

      await addCommentToDB({
        id: optimisticComment.id,
        author,
        content,
      });

      setAuthor("");
      setContent("");
      setStatus("idle");
    } catch (err) {
      setStatus("error");

      window.dispatchEvent(
        new CustomEvent("rollback-comment", {
          detail: optimisticComment.id,
        })
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Tu nombre"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <textarea
        className={styles.textarea}
        placeholder="Comentario"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className={`${styles.button} primary-button`} disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando..." : "Enviar"}
      </button>

      {status === "error" && (
        <p className={styles.error}>No se pudo enviar. Intentá de nuevo.</p>
      )}
    </form>
  );
}

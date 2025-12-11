"use client";

import { useEffect, useState } from "react";
import { Comment } from "../../lib/schema";
import { getCommentsFromDB } from "../../lib/comments";
import styles from "./CommentList.module.css";
import { timeAgo } from "@/app/lib/timeAgo";

export default function CommentList() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getCommentsFromDB();
      setComments(data);
    }
    load();
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const newComment = e.detail as Comment;
      setComments((prev) => [newComment, ...prev]);
    };
    window.addEventListener("new-comment", handler);
    return () => window.removeEventListener("new-comment", handler);
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      const id = e.detail;
      setComments((prev) => prev.filter((c) => c.id !== id));
    };
    window.addEventListener("rollback-comment", handler);
    return () => window.removeEventListener("rollback-comment", handler);
  }, []);

  if (comments.length === 0) {
    return <p className={styles.empty}>No hay comentarios aún.</p>;
  }

  return (
    <ul className={styles.list}>
      {comments.map((c) => (
        <li className={styles.item} key={c.id}>
          <strong>{c.author}</strong>
          <p>{c.content}</p>
            <small className={styles.time} title={new Date(c.createdAt).toLocaleString()}>
            {timeAgo(c.createdAt)}
            </small>
        </li>
      ))}
    </ul>
  );
}

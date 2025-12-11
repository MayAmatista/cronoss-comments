import CommentForm from "../components/CommentForm/CommentForm";
import CommentList from "../components/CommentList/CommentList";

export default function CommentsPage() {
  return (
    <div className="page-container">
      <h1>Comentarios</h1>
      <CommentForm />
      <CommentList />
    </div>
  );
}
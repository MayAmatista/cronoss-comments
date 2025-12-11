import CommentForm from "../components/CommentForm/CommentForm";
import CommentList from "../components/CommentList/CommentList";

export default function CommentsPage() {
  return (
    <div>
      <h1>Comments</h1>
      <CommentForm />
      <CommentList />
    </div>
  );
}
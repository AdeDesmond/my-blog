import { fetchCommentsByPostId } from "@/db/queries/comments/query-comments";
import { CommentShowItem } from "./comment-show-item";

interface CommentsListProps {
  postId: string;
}

export const CommentsList = async ({ postId }: CommentsListProps) => {
  const comments = await fetchCommentsByPostId(postId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedTopComments = topLevelComments.map((comment) => (
    <CommentShowItem key={comment.id} commentId={comment.id} postId={postId} />
  ));
  return (
    <div className="space-y-3 mt-4">
      <h2>All {comments.length} comments</h2>
      {renderedTopComments}
    </div>
  );
};

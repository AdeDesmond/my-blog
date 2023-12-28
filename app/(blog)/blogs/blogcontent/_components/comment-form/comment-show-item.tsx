import Image from "next/image";
import { CreateCommentForm } from "./create-form-comment";
import {
  fetchCommentsByPostId,
  CommentsWithAuthor,
} from "@/db/queries/comments/query-comments";

interface CommentShowProps {
  commentId?: string;
  postId: string;
}

export const CommentShowItem = async ({
  commentId,
  postId,
}: CommentShowProps) => {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) {
    return null;
  }
  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => (
    <CommentShowItem key={child.id} commentId={child.id} postId={postId} />
  ));
  return (
    <div className="p-4 mt-5 border mb-1 rounded-md z-10 dark:border-white border-slate-950">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="object-cover rounded-full w-10 h-10"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            {comment.user.name}
          </p>
          <p className="text-neutral-900 dark:text-slate-300">
            {comment.content}
          </p>
        </div>
        <CreateCommentForm
          postId={postId}
          title="more ideas"
          parentId={comment.id}
        />
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
};

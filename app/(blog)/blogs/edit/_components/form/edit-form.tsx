"use client";
import { useFormState } from "react-dom";
import { CatSubmitButton } from "@/app/(blog)/category/_components/form/category-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategoryData } from "@/db/queries/query-data";
import { updateBlog } from "@/actions/update-blog";
import { useEffect } from "react";
import { toast } from "sonner";

interface EditFormProps {
  catData: CategoryData;
  post: {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    color: string;
    image: string;
    categoryId: string;
    userId: string;
    create_at: Date;
    updated_at: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
  postId: string;
}

export const EditForm = ({ catData, post, postId }: EditFormProps) => {
  const initialState = { errors: {}, message: "" };
  const [state, dispatchUpdate] = useFormState(
    updateBlog.bind(null, postId),
    initialState
  );
  useEffect(() => {
    if (state.success) {
      toast.success("Successfully updated");
    }
  }, [state]);
  return (
    <form
      action={dispatchUpdate}
      className="flex flex-col gap-y-1 w-[50%] mx-auto"
    >
      <Label
        htmlFor="title"
        className="text-xl font-semibold text-muted-foreground uppercase"
      >
        title
      </Label>
      <Input
        type="text"
        name="title"
        id="title"
        placeholder="Update the title"
        defaultValue={post.title || ""}
      />
      <Label
        htmlFor="category"
        className="text-xl font-semibold text-muted-foreground uppercase"
      >
        Category
      </Label>
      <select
        name="category"
        id="category"
        defaultValue={post.categoryId || ""}
        className="w-[10rem] h-10 border border-slate-400 rounded-lg"
      >
        {catData.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category}
          </option>
        ))}
      </select>
      <Label
        htmlFor="subtitle"
        className="text-xl font-semibold text-muted-foreground uppercase"
      >
        subtitle
      </Label>

      <Input
        type="text"
        name="subtitle"
        id="subtitle"
        placeholder="Update the subtitle"
        defaultValue={post.subtitle || ""}
      />
      <Label
        htmlFor="content"
        className="text-xl font-semibold text-muted-foreground uppercase"
      >
        Content
      </Label>
      <Textarea
        name="content"
        id="content"
        placeholder="Update the content"
        defaultValue={post.content || ""}
      />
      <CatSubmitButton>Update blog</CatSubmitButton>
    </form>
  );
};

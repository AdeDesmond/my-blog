"use client";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@prisma/client";
import { CatSubmitButton } from "../../category/_components/form/category-submit-button";
import { uploadPhoto } from "@/actions/upload-blog-photo";
import { Spinner } from "@/components/spinners";
import Image from "next/image";
import { createBlogPost } from "@/actions/create-blog";
import { ElementRef, useEffect, useRef } from "react";

interface PostBlogFormProps {
  catData: Category[];
}

export const PostBlogForm = ({ catData }: PostBlogFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const formPhotoRef = useRef<ElementRef<"form">>(null);
  const initialState = { photoLink: "" };
  const blogInitialState = { errors: {}, message: "" };
  const [photoState, photoDispatch] = useFormState(uploadPhoto, initialState);
  const [blogState, blogDispatch] = useFormState(
    createBlogPost,
    blogInitialState
  );
  useEffect(() => {
    if (blogState.success) {
      setTimeout(() => {
        formRef.current?.reset();
      });
    }
  }, [blogState]);
  useEffect(() => {
    if (photoState.success) {
      formPhotoRef.current?.reset();
    }
  }, [photoState]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Post Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] lg:max-w-[600px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Post New Blog</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <form
            ref={formRef}
            action={blogDispatch}
            className="flex flex-col gap-y-2"
          >
            <Label
              htmlFor="title"
              className="text-muted-foreground font-semibold"
            >
              Blog Title
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your title"
            />
            {blogState.errors?.title &&
              blogState.errors.title.map((error) => (
                <p
                  key={error}
                  className="text-muted-foreground font-semibold text-rose-500"
                >
                  {error}
                </p>
              ))}
            <div className="flex items-center gap-x-2">
              <div className="flex flex-col gap-y-1">
                <Label
                  htmlFor="category"
                  className="text-muted-foreground font-semibold"
                >
                  Category
                </Label>
                <select
                  name="category"
                  id="category"
                  className="h-8 border border-neutral-400 rounded-lg bg-white w-[10rem]"
                >
                  {catData.map((categoryData) => (
                    <option key={categoryData.id} value={categoryData.id}>
                      {categoryData.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-y-1">
                <Label
                  htmlFor="colors"
                  className="text-muted-foreground font-semibold"
                >
                  Colors
                </Label>
                <select
                  name="color"
                  id="color"
                  className="w-[10rem] h-8 border border-neutral-400 rounded-lg bg-white"
                >
                  <option value="#d946ef">Fuchsia</option>
                  <option value="#ec4899">Pink</option>
                  <option value="#f43f5e">Rose</option>
                  <option value="#a855f7">Purple</option>
                  <option value="#8b5cf6">Violet</option>
                  <option value="#6366f1">Indigo</option>
                  <option value="#3b82f6">Blue</option>
                  <option value="#0ea5e9">Sky</option>
                  <option value="#06b6d4">Cyan</option>
                  <option value="#14b8a6">Teal</option>
                  <option value="#10b981">Emerald</option>
                  <option value="#f59e0b">Amber</option>
                  <option value="#f97316">Orange</option>
                </select>
                {blogState.errors?.color &&
                  blogState.errors.color.map((error) => (
                    <p
                      key={error}
                      className="text-muted-foreground font-semibold text-rose-500"
                    >
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <Label
              htmlFor="subtitle"
              className="text-muted-foreground font-semibold"
            >
              Blog Subtitle
            </Label>
            <Input
              type="text"
              name="subtitle"
              id="subtitle"
              placeholder="Enter your subtitle"
            />
            {blogState.errors?.subtitle &&
              blogState.errors.subtitle.map((error) => (
                <p
                  key={error}
                  className="text-muted-foreground font-semibold text-rose-500"
                >
                  {error}
                </p>
              ))}
            <Label
              htmlFor="content"
              className="text-muted-foreground font-semibold"
            >
              Blog Content
            </Label>
            <Textarea
              name="content"
              id="content"
              placeholder="Enter your content"
            />
            {blogState.errors?.content &&
              blogState.errors.content.map((error) => (
                <p
                  key={error}
                  className="text-muted-foreground font-semibold text-rose-500"
                >
                  {error}
                </p>
              ))}
            <Input
              hidden
              className="hidden"
              name="image"
              id="image"
              defaultValue={photoState.photoLink || ""}
            />
            <CatSubmitButton>Confirm Blog Submit </CatSubmitButton>
          </form>
          {photoState.photoLink === "" ? (
            <Spinner />
          ) : (
            <Image
              src={photoState.photoLink || ""}
              alt="blog photo"
              height={100}
              width={100}
              className="object-cover mt-2 mb-2 shadow-sm hover:scale-105 transition rounded-sm"
            />
          )}
          <form
            ref={formPhotoRef}
            action={photoDispatch}
            className="flex flex-col gap-y-1"
          >
            <Label
              htmlFor="photo"
              className="text-muted-foreground font-semibold"
            >
              Blog Photo
            </Label>
            <Input
              type="file"
              name="photo"
              id="photo"
              placeholder="upload photo"
            />
            <CatSubmitButton>Upload Photo</CatSubmitButton>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

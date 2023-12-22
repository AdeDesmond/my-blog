import React from "react";
import { EditForm } from "../_components/form/edit-form";
import { fetchCatData } from "@/db/queries/query-data";
import { fetchPostWithFullContent } from "@/db/queries/posts/query-fullcontent";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: EditPageProps) {
  const catData = await fetchCatData();
  const uneditedData = await fetchPostWithFullContent(params.id);
  const categories = catData.map((data) => {
    return data;
  });
  return (
    <div>
      <EditForm catData={categories} post={uneditedData} postId={params.id} />
    </div>
  );
}

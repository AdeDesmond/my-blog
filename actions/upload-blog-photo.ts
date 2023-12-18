"use server";

import { uploadBlogImage } from "@/db/supabase/upload-photo";

interface UploadPhotoProps {
  photoLink?: string;
  success?: boolean;
}

export async function uploadPhoto(
  photoState: UploadPhotoProps,
  formData: FormData
): Promise<UploadPhotoProps> {
  const photo = formData.get("photo");
  try {
    const photoImage = await uploadBlogImage(photo as File);
    return {
      photoLink: photoImage,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("something went wrong");
    }
  }
  return {
    success: true,
  };
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ImageKitService } from "@/services/imagekit";
import { ImageFile, UploadResponse } from "@/types/upload";

export const useImageUpload = (onUploadSuccess?: () => void) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      return ImageKitService.uploadMultipleImages(files);
    },
    onSuccess: (results: UploadResponse[]) => {
      const successfulUploads = results.filter((result) => result.success);
      const failedUploads = results.filter((result) => !result.success);

      if (successfulUploads.length > 0) {
        console.log("Uploads bem-sucedidos:", successfulUploads.length);
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      }

      if (failedUploads.length > 0) {
        console.error("Uploads falharam:", failedUploads);
      }
    },
    onError: (error) => {
      console.error("Erro no upload:", error);
    },
  });

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files).map((file) => ({
      file,
      preview: "", // Não precisamos mais do preview
      id: `${Date.now()}-${Math.random()}`,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setSelectedImages((prev) => {
      return prev.filter((img) => img.id !== id);
    });
  };

  const uploadImages = (files: File[]) => {
    if (files.length === 0) return;
    uploadMutation.mutate(files);
  };

  const clearImages = () => {
    setSelectedImages([]);
  };

  return {
    selectedImages,
    handleFileSelect,
    removeImage,
    uploadImages,
    clearImages,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  };
};

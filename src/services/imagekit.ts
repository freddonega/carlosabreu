import { UploadResponse } from "@/types/upload";

export class ImageKitService {
  private static validateFile(file: File): string | null {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (file.size > maxSize) {
      return "Arquivo muito grande. Máximo 5MB por imagem.";
    }

    if (!allowedTypes.includes(file.type)) {
      return "Tipo de arquivo não suportado. Use JPEG, PNG ou WebP.";
    }

    return null;
  }

  static async uploadImage(file: File): Promise<UploadResponse> {
    try {
      const validationError = this.validateFile(file);
      if (validationError) {
        return { success: false, error: validationError };
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data && data.success) {
        return { success: true, url: data.url };
      } else {
        return {
          success: false,
          error: data.error || "Erro no upload da imagem.",
        };
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Erro interno do servidor.";
      return { success: false, error: errorMessage };
    }
  }

  static async uploadMultipleImages(files: File[]): Promise<UploadResponse[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }
}

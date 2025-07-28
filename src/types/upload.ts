export interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

export interface UploadFormData {
  images: ImageFile[];
}

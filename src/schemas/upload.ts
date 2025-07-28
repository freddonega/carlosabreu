import { z } from "zod";

export const uploadSchema = z.object({
  images: z
    .array(
      z.object({
        file: z.instanceof(File),
        preview: z.string(),
        id: z.string(),
      })
    )
    .min(1, "Selecione pelo menos uma imagem")
    .max(10, "Máximo de 10 imagens por vez"),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

"use client";

import { useRef } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface UploadFormProps {
  onUploadSuccess: () => void;
}

export const UploadForm = ({ onUploadSuccess }: UploadFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedImages,
    handleFileSelect,
    uploadImages,
    clearImages,
    isUploading,
    uploadError,
  } = useImageUpload(onUploadSuccess, () => {
    // Reset do input de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  });

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileSelect(event.target.files);
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileSelect(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) return;

    const files = selectedImages.map((img) => img.file);
    uploadImages(files);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-amber-200">
      <h2 className="text-xl font-serif text-amber-800 mb-2 text-center mb-10">
        Tirou aquela foto pinnnca? Envia aqui pra nós
      </h2>

      {/* Área de Upload */}
      <div
        className="border-2 border-dashed border-amber-300 rounded-2xl p-12 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xl font-serif text-amber-800 mb-2">
              Arraste suas fotos aqui ou clique para selecionar
            </p>
            <p className="text-sm text-amber-600 font-light">
              Suporte para JPEG, PNG e WebP. Máximo 5MB por foto.
            </p>
          </div>
        </div>
      </div>

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Contador de Fotos */}
      {selectedImages.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg font-serif text-amber-800 mb-4">
            {selectedImages.length} foto{selectedImages.length > 1 ? "s" : ""}{" "}
            selecionada{selectedImages.length > 1 ? "s" : ""}
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={clearImages}
              className="text-amber-500 hover:text-amber-700 text-sm font-medium transition-colors duration-200 px-4 py-2 border border-amber-300 rounded-lg hover:bg-amber-50"
            >
              Limpar Todas
            </button>

            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando Fotos...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Enviar Fotos
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mensagem de Erro */}
      {uploadError && (
        <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-2xl">
          <p className="text-red-700 text-sm font-medium">
            Erro no upload: {uploadError.message}
          </p>
        </div>
      )}
    </div>
  );
};

"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Upload } from "lucide-react";
import axios from "axios";

export default function ImagePicker({ onImageSelect, currentImage = "" }) {
  const [selectedImage, setSelectedImage] = useState(currentImage);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const CLOUD_NAME = "do2guqnvl";
  const UPLOAD_PRESET = "portfolio_unsigned";

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, WEBP, or GIF)");
      return;
    }

    setUploading(true);
    setError(null);

    let attempt = 0;
    const maxAttempts = 3;
    const timeoutMs = 60000; // Increased to 60 seconds

    while (attempt < maxAttempts) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", "portfolio_images");

        console.log(`Upload attempt ${attempt + 1}/${maxAttempts} details:`, {
          cloudName: CLOUD_NAME,
          uploadPreset: UPLOAD_PRESET,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        });

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData,
          {
            timeout: timeoutMs,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const imageUrl = response.data.secure_url;
        console.log("Upload successful, URL:", imageUrl);
        setSelectedImage(imageUrl);
        onImageSelect(imageUrl);
        return; // Exit on success
      } catch (err) {
        console.error(`Upload attempt ${attempt + 1} failed:`, {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          code: err.code,
          config: err.config,
        });
        if (err.code === "ECONNABORTED" && attempt < maxAttempts - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
          attempt++;
          continue;
        }
        setError(
          `❌ Upload failed after ${maxAttempts} attempts: ${
            err.response?.data?.error?.message ||
            err.response?.data?.message ||
            err.message ||
            "Unknown error"
          }`
        );
        return;
      } finally {
        setUploading(false);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input for next upload
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium">Upload Project Image</h4>
        <motion.label
          htmlFor="image-upload"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center space-x-2 px-4 py-2 bg-spotify-green text-black font-medium rounded-lg hover:bg-spotify-green/90 transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ImageIcon size={16} />
          <span>{uploading ? "Uploading..." : "Choose Image"}</span>
        </motion.label>
        <input
          id="image-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageSelect}
          className="hidden"
          disabled={uploading}
          ref={fileInputRef}
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {selectedImage && (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-full h-32 object-cover rounded-lg border-2 border-spotify-green"
          />
          <div className="absolute top-2 right-2 bg-spotify-green text-black p-1 rounded-full">
            <Upload size={16} />
          </div>
        </div>
      )}
    </div>
  );
}
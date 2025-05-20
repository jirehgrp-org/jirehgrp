/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// @/app/page.tsx

"use client";
import React, { useState, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { FileUpload } from "@/components/ui/aceternity/file-upload";
// import { Button } from "@/components/ui/button";

export default function Home() {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [hocr, setHocr] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [plainText, setPlainText] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    displayWidth: 0,
    displayHeight: 0,
  });

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);
    setHocr(null);
    setIsProcessing(true);
    setError(null);

    try {
      // Load image dimensions first
      const img = new Image();
      img.src = url;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          setImageSize((prev) => ({
            ...prev,
            width: img.width,
            height: img.height,
          }));
          resolve();
        };
        img.onerror = () => {
          reject("Failed to load image dimensions");
        };
      });

      // Create Tesseract.js v6 worker for both Amharic and English
      const worker = await createWorker("amh+eng");
      const result = await worker.recognize(file);

      setHocr(result.data.hocr);
      setPlainText(result.data.text || "");
      await worker.terminate();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "OCR failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const updateImageSize = () => {
    if (imageRef.current) {
      const { clientWidth, clientHeight } = imageRef.current;
      if (clientWidth && clientHeight) {
        setImageSize((prev) => ({
          ...prev,
          displayWidth: clientWidth,
          displayHeight: clientHeight,
        }));
      }
    }
  };

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      updateImageSize();
    }
  }, [imageURL]);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-black px-4">
        <Header />
        <div className="w-full max-w-4xl p-4 bg-white dark:bg-black border border-dashed rounded-lg">
          <FileUpload onChange={handleFileUpload} />

          {isProcessing && (
            <p className="text-center text-blue-500 my-4">Processing image...</p>
          )}

          {error && (
            <p className="text-center text-red-500 my-4">{error}</p>
          )}

          {imageURL && (
            <div className="overflow-auto max-h-[90vh]">
              {plainText && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(plainText).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      });
                    }}
                    className="text-sm px-4 py-1 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {copied ? "Copied!" : "Copy All Text"}
                  </button>
                </div>
              )}
              <div className="relative inline-block">
                <img
                  ref={imageRef}
                  src={imageURL}
                  alt="Uploaded"
                  className="block select-none pointer-events-none"
                  draggable={false}
                  onLoad={updateImageSize}
                />
                {hocr && imageSize.width > 0 && imageSize.displayWidth > 0 && (
                  <div
                    className="absolute top-0 left-0 z-10 select-text"
                    style={{
                      width: `${imageSize.width}px`,
                      height: `${imageSize.height}px`,
                      zoom: imageSize.displayWidth / imageSize.width,
                    }}
                    dangerouslySetInnerHTML={{ __html: hocr }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />


        <style jsx global>{`
        .ocr_page {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
        }

        .ocrx_word {
          position: absolute;
          user-select: text;
          pointer-events: auto;
          white-space: pre;
          font-size: 12px;
          line-height: 1;
          background: rgba(255, 255, 0, 0.3); /* yellow highlight */
          color: black; /* show actual text */
          padding: 1px 2px;
          border-radius: 2px;
          font-family: inherit;
        }

        .ocrx_word:hover {
          outline: 1px dashed rgba(0, 0, 0, 0.5);
          background: rgba(255, 255, 0, 0.5);
        }

        .ocrx_word::selection {
          background: rgba(0, 0, 0, 0.8);
          color: white;
        }
      `}</style>
      </div>
    </>
  );
}
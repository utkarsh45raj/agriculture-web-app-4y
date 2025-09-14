"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Camera, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onImageUpload: (file: File, imageUrl: string) => void
  isAnalyzing: boolean
}

export function ImageUpload({ onImageUpload, isAnalyzing }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      onImageUpload(file, imageUrl)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const clearImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          <span>Upload Plant Image</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uploadedImage ? (
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded plant"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-lg border"
              />
              {!isAnalyzing && (
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearImage}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isAnalyzing && (
              <div className="text-center">
                <div className="animate-pulse text-primary">Analyzing image for pests and diseases...</div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium">Upload or capture plant image</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image here, or click to select from your device
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
                <Button variant="outline" onClick={() => cameraInputRef.current?.click()} className="bg-transparent">
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP files up to 10MB</p>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

'use client'

import Image from 'next/image'
import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { FiCheck, FiEye, FiFileText, FiImage, FiUploadCloud, FiX } from 'react-icons/fi'

import { Modal } from '@/components/ui/modal'

type FileUploadProps = {
  label: string
  accept: string
  value?: string
  onUpload: (file: File) => Promise<string>
  fullWidthImagePreview?: boolean
  cropAspectRatio?: number
}

function getFileNameFromUrl(url?: string) {
  if (!url) {
    return ''
  }

  const cleanUrl = url.split('?')[0]
  const segments = cleanUrl.split('/')

  return decodeURIComponent(segments[segments.length - 1] || cleanUrl)
}

function resolveFileUrl(url?: string) {
  if (!url) {
    return ''
  }

  if (url.startsWith('blob:') || url.startsWith('data:')) {
    return url
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  const baseUrl = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000').replace(/\/$/, '')
  const normalizedPath = url.startsWith('/') ? url : `/${url}`

  return `${baseUrl}${normalizedPath}`
}

function isImageFile(file?: File | null, url?: string) {
  if (file?.type.startsWith('image/')) {
    return true
  }

  return Boolean(url && /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(url))
}

function isPdfFile(file?: File | null, url?: string) {
  if (file?.type === 'application/pdf') {
    return true
  }

  return Boolean(url && /\.pdf$/i.test(url))
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUpload({
  label,
  accept,
  value,
  onUpload,
  fullWidthImagePreview = false,
  cropAspectRatio = 1,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [savedValue, setSavedValue] = useState<string>('')
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [displayFileName, setDisplayFileName] = useState<string>('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState<string | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const effectiveValue = savedValue || value || ''
  const persistedPreviewUrl = effectiveValue ? resolveFileUrl(effectiveValue) : ''
  const shouldPreferPersistedPreview =
    Boolean(persistedPreviewUrl) && Boolean(localPreviewUrl?.startsWith('blob:'))
  const previewUrl = shouldPreferPersistedPreview ? persistedPreviewUrl : localPreviewUrl || value
  const resolvedPreviewUrl = resolveFileUrl(previewUrl)
  const hasImagePreview = isImageFile(uploadedFile, previewUrl)
  const hasPdfPreview = isPdfFile(uploadedFile, previewUrl)
  const hasPreview = Boolean(previewUrl)
  const fileName = useMemo(() => {
    return displayFileName || uploadedFile?.name || getFileNameFromUrl(effectiveValue)
  }, [displayFileName, uploadedFile, effectiveValue])
  const helperText = useMemo(() => {
    if (fileName) {
      return `File: ${fileName}`
    }

    return 'File: No file selected'
  }, [fileName])

  useEffect(() => {
    return () => {
      if (localPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(localPreviewUrl)
      if (pendingPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(pendingPreviewUrl)
    }
  }, [localPreviewUrl, pendingPreviewUrl])

  function closeConfirmModal() {
    if (pendingPreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(pendingPreviewUrl)
    }

    setPendingFile(null)
    setPendingPreviewUrl(null)
    setIsConfirmOpen(false)
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPendingFile(file)
    setPendingPreviewUrl(objectUrl)
    setIsConfirmOpen(true)
    event.target.value = ''
  }

  async function handleConfirmUpload() {
    if (!pendingFile) {
      return
    }

    const previewObjectUrl = URL.createObjectURL(pendingFile)

    setLocalPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(currentPreviewUrl)
      }

      return previewObjectUrl
    })
    setUploadedFile(pendingFile)
    setDisplayFileName(pendingFile.name)
    setIsUploading(true)
    setIsConfirmOpen(false)

    try {
      const uploadedPath = await onUpload(pendingFile)
      setSavedValue(uploadedPath)
      setPendingFile(null)
      if (pendingPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(pendingPreviewUrl)
      }
      setPendingPreviewUrl(null)
    } catch {
      URL.revokeObjectURL(previewObjectUrl)
      if (pendingPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(pendingPreviewUrl)
      }
      setLocalPreviewUrl(null)
      setUploadedFile(null)
      setDisplayFileName('')
      setSavedValue('')
      setPendingFile(null)
      setPendingPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>

      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-100">{helperText}</p>
            <p className="mt-1 text-xs text-slate-400">
              {isUploading ? 'Uploading file...' : 'Select a file to upload.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasPreview ? (
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
              >
                <FiEye className="h-4 w-4" />
                Preview
              </button>
            ) : null}

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-white">
              <FiUploadCloud className="h-4 w-4" />
              <span>Select file</span>
              <input
                type="file"
                accept={accept}
                onChange={handleChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPreviewOpen}
        title="Preview"
        onClose={() => setIsPreviewOpen(false)}
        className={fullWidthImagePreview ? 'max-w-5xl' : 'max-w-3xl'}
      >
        <div className="space-y-4">
          {hasImagePreview ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-white">
              <Image
                src={resolvedPreviewUrl}
                alt={fileName || 'File preview'}
                width={1600}
                height={1600}
                unoptimized
                className="mx-auto block max-h-[80vh] w-full object-contain"
              />
            </div>
          ) : null}

          {hasPdfPreview ? (
            <div className="flex min-h-[18rem] w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-200 p-6 text-slate-950">
              <FiFileText className="h-6 w-6 shrink-0" />
              <span className="truncate text-base">
                {fileName || getFileNameFromUrl(previewUrl)}
              </span>
            </div>
          ) : null}

          {!hasImagePreview && !hasPdfPreview ? (
            <div className="flex min-h-[18rem] w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-200 p-6 text-slate-950">
              <FiImage className="h-6 w-6 shrink-0" />
              <span className="truncate text-base">
                {fileName || getFileNameFromUrl(previewUrl)}
              </span>
            </div>
          ) : null}

          <div className="text-center text-sm text-slate-400">
            <p>{`File: ${fileName || getFileNameFromUrl(previewUrl)}`}</p>
            {uploadedFile ? <p>{`Size: ${formatFileSize(uploadedFile.size)}`}</p> : null}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isConfirmOpen}
        title="Confirm image"
        description={
          pendingFile
            ? `Confirm upload of ${pendingFile.name} with ${formatFileSize(pendingFile.size)}.`
            : 'Review the selected image before saving it.'
        }
        onClose={closeConfirmModal}
        className={cropAspectRatio > 1 ? 'max-w-5xl' : 'max-w-lg'}
      >
        <div className="space-y-4">
          {pendingPreviewUrl ? (
            <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-white">
              <Image
                src={pendingPreviewUrl}
                alt="Selected image preview"
                width={1600}
                height={1600}
                unoptimized
                className="mx-auto block max-h-[80vh] w-full object-contain"
              />
            </div>
          ) : null}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeConfirmModal}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
            >
              <FiX className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void handleConfirmUpload()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-white"
            >
              <FiCheck className="h-4 w-4" />
              Save image
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

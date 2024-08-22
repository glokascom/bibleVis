'use client'

import { useState } from 'react'

export default function UserUpload({ uuid }) {
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [avatarError, setAvatarError] = useState(null)
  const [coverError, setCoverError] = useState(null)

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files?.[0] || null)
    setAvatarError(null) // Сброс ошибки при новом выборе файла
  }

  const handleCoverChange = (e) => {
    setCoverFile(e.target.files?.[0] || null)
    setCoverError(null) // Сброс ошибки при новом выборе файла
  }

  const handleUpload = async () => {
    setLoading(true)
    setUploadError(null)
    setAvatarError(null)
    setCoverError(null)

    const formData = new FormData()
    formData.append('uuid', uuid)

    if (avatarFile) formData.append('avatar', avatarFile)
    if (coverFile) formData.append('cover', coverFile)

    try {
      const response = await fetch(`/api/upload`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.message || 'Upload failed'
        throw new Error(errorMessage)
      }

      const data = await response.json()

      if (data.error) {
        if (data.error === 'avatar') {
          setAvatarError('Error uploading avatar: ' + data.message)
        } else if (data.error === 'cover') {
          setCoverError('Error uploading cover: ' + data.message)
        } else {
          setUploadError('Error uploading files: ' + data.message)
        }
      } else {
        console.log('Files uploaded successfully:', data)
      }
    } catch (e) {
      setUploadError('Error uploading files: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div>
        <h2>Upload Avatar</h2>
        <input type="file" onChange={handleAvatarChange} />
        {avatarError && <p className="text-red-500">{avatarError}</p>}
      </div>

      <div>
        <h2>Upload Cover</h2>
        <input type="file" onChange={handleCoverChange} />
        {coverError && <p className="text-red-500">{coverError}</p>}
      </div>

      {uploadError && <p className="text-red-500">{uploadError}</p>}

      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Files'}
      </button>
    </div>
  )
}

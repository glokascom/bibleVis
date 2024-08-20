import { useEffect, useState } from 'react'

import { BVAvatar } from '@/app/components/BVAvatar'
import { BVButton } from '@/app/components/BVButton'

function AvatarUpload() {
  const [error, setError] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setError(null)
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    const maxFileSizeMB = 2
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError('Max file size is ' + maxFileSizeMB + 'MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      if (!reader.result) {
        setError('Something went wrong')
        return
      }
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }
  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  return (
    <div>
      <div className="mb-2.5 font-bold">Avatar</div>
      <div className="flex flex-col items-center gap-5 rounded-small bg-secondary-100 py-7">
        <BVAvatar size="xxl" src={preview} />
        <label htmlFor="file-upload">
          <BVButton as="span">Upload new avatar</BVButton>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  )
}

export default AvatarUpload

export const validateAndLoadImage = (file, onImageChange) => {
  const validTypes = ['image/jpeg', 'image/png']
  if (!validTypes.includes(file.type)) {
    onImageChange(file, 'Invalid file format. Please upload JPG or PNG.')
    return
  }

  if (file.size > 4 * 1024 * 1024) {
    onImageChange(file, 'The file is too large. Maximum size is 4MB.')
    return
  }

  const img = new window.Image()
  img.onload = function () {
    if (this.width < 1920 && this.height < 1920) {
      onImageChange(
        file,
        'The image is too small. The minimum size is 1920 pixels on one side.'
      )
    } else {
      onImageChange(file, null)
    }
  }
  img.onerror = function () {
    onImageChange(file, 'Failed to load image. Please try another file.')
  }
  img.src = URL.createObjectURL(file)

  return () => {
    URL.revokeObjectURL(img.src)
  }
}

export const openFileDialog = (onFileSelect) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/jpeg,image/png'
  input.onchange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }
  input.click()
}

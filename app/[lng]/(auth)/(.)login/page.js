'use client'

import TagInput from '@/app/components/TagInput'

import LoginForm from '../components/LoginForm'

const initialTags = [
  'Adobe Photoshop',
  'CorelDRAW',
  'Canva',
  'Adobe Lightroom',
  'Figma',
  'Adobe Illustrator',
  'Sketch',
  'DALL-E',
  'Midjourney',
  'Stable Diffusion',
  'Leonardo.AI',
]

export default function LoginPage() {
  const handleTagsChange = (tags) => {
    console.log('Теги изменены:', tags)
  }

  return (
    <>
      <h1 className="text-3xl text-red-900">Modal</h1>
      <TagInput initialTags={initialTags} onTagsChange={handleTagsChange} />
      <LoginForm />
    </>
  )
}

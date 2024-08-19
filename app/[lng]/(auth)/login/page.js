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
  'Adobe Photoshop1',
  'CorelDRAW2',
  'Canva1',
  'Adobe Lightroom2',
  'Figma3',
  'Adobe Illustrator4',
  'Sketch5',
  'DALL-E6',
  'Midjourney5',
  'Stable Diffusion6',
  'Leonardo.AI6',
]

export default function LoginPage() {
  const handleTagsChange = (tags) => {
    console.log('Теги изменены:', tags)
  }

  return (
    <>
      <div className="my-5">
        <TagInput initialTags={initialTags} onTagsChange={handleTagsChange} />
        <LoginForm />
      </div>
    </>
  )
}

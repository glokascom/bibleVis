import TagInput from '@/app/components/TagInput'

export default function Upload() {
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
  const handleTagsChange = (tags) => {
    console.log('Теги изменены:', tags)
  }
  return (
    <div className="pb-52">
      User Upload Page
      <TagInput
        initialTags={initialTags}
        allowAddOnEnter={false}
        onTagsChange={handleTagsChange}
      />
    </div>
  )
}

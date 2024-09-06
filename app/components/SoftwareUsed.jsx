function SoftwareUsed() {
  const software = [
    'Adobe Lightroom',
    'Adobe Photoshop',
    'Figma',
    'CorelDRAW',
    'Adobe illustrator',
    'Canva',
  ]

  return (
    <div className="text-small">
      <p className="pb-5 font-bold">Software Used</p>

      <div className="flex flex-wrap gap-2.5">
        {software.map((soft, index) => (
          <div
            key={index}
            className="flex cursor-default items-center justify-center rounded-medium bg-secondary-100 px-5 py-2.5"
          >
            <span>{soft}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoftwareUsed

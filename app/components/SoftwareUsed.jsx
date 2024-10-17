function SoftwareUsed({ software = [] }) {
  if (software.length === 0) {
    return <p>No software information available</p>
  }

  return (
    <div className="text-small">
      <p className="pb-5 font-bold">Software Used</p>

      <div className="flex flex-wrap gap-2.5">
        {software.map(({ id, name }) => (
          <div
            key={id}
            className="flex cursor-default items-center justify-center rounded-medium bg-secondary-100 px-5 py-2.5"
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoftwareUsed

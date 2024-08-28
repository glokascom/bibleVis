let cachedImages = null
let currentPage = 1

export const getImages = async (page = 1, pageSize = 10) => {
  //пример использования загрузки картинок постраничный
  if (!cachedImages) {
    const getRandomOrientation = () => {
      return Math.random() > 0.5 ? 'portrait' : 'landscape'
    }

    const generateImages = async (count = 50) => {
      const images = []
      const titles = new Set()
      const imageUrls = ['/jesus.webp', '/ship.webp']

      for (let i = 1; i <= count; i++) {
        let title

        do {
          title = `Title ${Math.floor(Math.random() * 1000)}`
        } while (titles.has(title))

        titles.add(title)

        images.push({
          id: i,
          url: imageUrls[i % 2],
          title: title,
          user: {
            username: `username${i}`,
          },
          orientation: getRandomOrientation(),
        })
      }

      return images
    }

    cachedImages = await generateImages()
  }

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return cachedImages.slice(startIndex, endIndex)
}

export const loadNextPage = async () => {
  const images = await getImages(currentPage)
  currentPage += 1
  return images
}

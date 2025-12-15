// src/data/menu.js
import rawData from './data.json'

// only import files named food_<whatever>.png
const images = import.meta.globEager('../assets/food_*.png')

export const menu = rawData.map((item, idx) => {
  const id = idx + 1
  const key = `../assets/${item.imageFile}`   // e.g. "food_1.png"
  const resolved = images[key]

  if (!resolved) {
    console.warn(`Missing image for ${item.imageFile}`)
  }

  return {
    id,
    ...item,
    imageUrl: resolved?.default || ''
  }
})

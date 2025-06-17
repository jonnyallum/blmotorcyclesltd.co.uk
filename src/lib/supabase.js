import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kenaardqwnpeqtwukdnb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbmFhcmRxd25wZXF0d3VrZG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzkwMzcsImV4cCI6MjA2MjcxNTAzN30.eOfY8zr3E5hljBDyUuP5d1VIyvuusf9SHSAU5P88UyU'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Import images
import blLogo from '../assets/images/bl-logo.png'
import brakeDisc from '../assets/images/brake-disc.jpg'
import brakeParts from '../assets/images/brake-parts.webp'
import engineParts from '../assets/images/engine-parts.jpg'

// Get products with proper titles and images
export const getProducts = async (limit = 12, offset = 0, searchQuery = '', category = '') => {
  try {
    let query = supabase
      .from('product_inventory')
      .select('id, title, sku, trade_price, retail_price, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5, source_category')
      .not('title', 'is', null)
      .not('trade_price', 'is', null)
      .order('created_at', { ascending: false })

    // Add search filter
    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`)
    }

    // Add category filter
    if (category) {
      query = query.ilike('title', `%${category}%`)
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching products:', error)
      return { products: [], total: 0 }
    }

    // Process products to add proper image and category
    const processedProducts = data.map(product => ({
      ...product,
      name: product.title || product.sku || 'Motorcycle Part',
      price: product.trade_price || product.retail_price || 0,
      image: getProductImage(product),
      category: getProductCategory(product.title, product.source_category),
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      reviews: Math.floor(Math.random() * 100) + 10
    }))

    return { products: processedProducts, total: count || 0 }
  } catch (error) {
    console.error('Error in getProducts:', error)
    return { products: [], total: 0 }
  }
}

// Get the best available product image with B&L logo fallback
const getProductImage = (product) => {
  // Try each image URL in order
  const imageUrls = [
    product.image_url_1,
    product.image_url_2, 
    product.image_url_3,
    product.image_url_4,
    product.image_url_5
  ].filter(url => url && url.trim() !== '' && isValidImageUrl(url))

  if (imageUrls.length > 0) {
    return imageUrls[0] // Return first available valid image
  }

  // Fallback to category-specific images or B&L logo
  const category = getProductCategory(product.title, product.source_category)
  return getCategoryImage(category)
}

// Check if URL looks like a valid image URL
const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  const cleanUrl = url.trim().toLowerCase()
  return cleanUrl.startsWith('http') && 
         (cleanUrl.includes('.jpg') || cleanUrl.includes('.jpeg') || 
          cleanUrl.includes('.png') || cleanUrl.includes('.webp') || 
          cleanUrl.includes('.gif'))
}

// Get all available images for a product
export const getProductImages = (product) => {
  const imageUrls = [
    product.image_url_1,
    product.image_url_2, 
    product.image_url_3,
    product.image_url_4,
    product.image_url_5
  ].filter(url => url && url.trim() !== '' && isValidImageUrl(url))

  if (imageUrls.length === 0) {
    const category = getProductCategory(product.title, product.source_category)
    return [getCategoryImage(category)]
  }

  return imageUrls
}

// Determine product category from title and source
const getProductCategory = (title, sourceCategory) => {
  if (!title) return 'Parts'
  
  const titleLower = title.toLowerCase()
  
  if (titleLower.includes('brake') || titleLower.includes('disc') || titleLower.includes('pad')) {
    return 'Brakes'
  } else if (titleLower.includes('engine') || titleLower.includes('piston') || titleLower.includes('cylinder')) {
    return 'Engine'
  } else if (titleLower.includes('suspension') || titleLower.includes('shock') || titleLower.includes('spring')) {
    return 'Suspension'
  } else if (titleLower.includes('electrical') || titleLower.includes('wire') || titleLower.includes('light')) {
    return 'Electrical'
  } else if (titleLower.includes('clutch')) {
    return 'Clutch'
  } else if (titleLower.includes('sprocket') || titleLower.includes('chain')) {
    return 'Drive'
  } else if (sourceCategory) {
    return sourceCategory
  }
  
  return 'Parts'
}

// Get category-specific image or B&L logo fallback
const getCategoryImage = (category) => {
  const categoryImages = {
    'Brakes': brakeDisc,
    'Engine': engineParts,
    'Suspension': blLogo, // Use B&L logo for suspension
    'Electrical': blLogo, // Use B&L logo for electrical
    'Clutch': blLogo,     // Use B&L logo for clutch
    'Drive': blLogo,      // Use B&L logo for drive
    'Parts': blLogo       // Use B&L logo for general parts
  }
  
  return categoryImages[category] || blLogo
}

// Search products
export const searchProducts = async (query, limit = 12) => {
  return getProducts(limit, 0, query)
}

// Get products by category
export const getProductsByCategory = async (category, limit = 12) => {
  return getProducts(limit, 0, '', category)
}


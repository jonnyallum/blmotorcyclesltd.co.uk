import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import { getProducts, searchProducts, getProductsByCategory, getProductImages } from './lib/supabase'
import blLogo from './assets/images/bl-logo.png'

// Product Detail Component
function ProductDetail({ product, onClose }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="product-image">
              <img src={product.image} alt={product.name} onError={(e) => {
                e.target.src = blLogo;
              }} />
            </div>
            
            <div>
              <div className="product-category mb-2">{product.category}</div>
              <div className="product-sku mb-4">SKU: {product.sku}</div>
              
              <div className="product-rating mb-4">
                <div className="stars">★★★★☆</div>
                <span className="rating-text">({product.review_count} reviews)</span>
              </div>
              
              <div className="product-price mb-6">£{product.price.toFixed(2)}</div>
              
              <button className="add-to-cart w-full">
                Add to Cart
              </button>
              
              <div className="mt-6 text-gray-300">
                <h3 className="font-semibold mb-2">Product Details</h3>
                <p>High-quality motorcycle part from B&L Motorcycles. Professional grade component designed for optimal performance and durability.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Header Component
function Header({ cartCount, searchTerm, setSearchTerm, onSearch }) {
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span>📞 07881274193</span>
            <span>✉️ brett@blmotorcyclesltd.co.uk</span>
            <span>📍 Fareham, Hampshire</span>
          </div>
          <div>
            <span>Free Delivery on orders over £50</span>
          </div>
        </div>
      </div>
      
      <div className="header-main">
        <div className="container flex justify-between items-center">
          <Link to="/" className="logo">
            <img src={blLogo} alt="B&L Motorcycles" />
            <div>
              <div>B&L Motorcycles</div>
              <div style={{fontSize: '14px', fontWeight: 400}}>Premium Parts & Accessories</div>
            </div>
          </Link>

          <div className="search-container">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search 36,000+ motorcycle parts..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-secondary">Expert Support</button>
            <Link to="/cart" className="cart-btn">
              Cart{cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="border-t border-gray-700">
        <div className="container">
          <div className="nav-links py-3">
            <Link to="/" className="nav-link">🏠 Home</Link>
            <Link to="/products" className="nav-link">All Parts</Link>
            <Link to="/products?category=Engine" className="nav-link">⚙️ Engine</Link>
            <Link to="/products?category=Brakes" className="nav-link">🛑 Brakes</Link>
            <Link to="/products?category=Suspension" className="nav-link">🔩 Suspension</Link>
            <Link to="/products?category=Electrical" className="nav-link">⚡ Electrical</Link>
            <Link to="/about" className="nav-link">ℹ️ About</Link>
            <Link to="/contact" className="nav-link">📞 Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

// Home Page Component
function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Premium Motorcycle Parts & Accessories</h1>
          <p>Discover our extensive collection of over 36,000 high-quality motorcycle parts. From engine components to electrical systems, we have everything you need to keep your bike running perfectly.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="btn-primary">Browse All Parts</Link>
            <button className="btn-secondary">Get Expert Advice</button>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats">
            <div className="stat-item">
              <h3>36,000+</h3>
              <p>Parts Available</p>
            </div>
            <div className="stat-item">
              <h3>24hr</h3>
              <p>Delivery Available</p>
            </div>
            <div className="stat-item">
              <h3>99.8%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Products Page Component
function ProductsPage({ searchTerm, categoryFilter, onProductClick, cartItems, setCartItems }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const urlSearch = searchParams.get('search') || ''
  const urlCategory = searchParams.get('category') || ''

  const effectiveSearch = urlSearch || searchTerm
  const effectiveCategory = urlCategory || categoryFilter

  useEffect(() => {
    loadProducts()
  }, [effectiveSearch, effectiveCategory, currentPage])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const offset = (currentPage - 1) * productsPerPage
      const { products: productsData, total: count } = await getProducts(
        productsPerPage, 
        offset, 
        effectiveSearch, 
        effectiveCategory
      )
      
      setProducts(productsData)
      setTotalCount(count)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(totalCount / productsPerPage)

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  const pageTitle = effectiveSearch 
    ? `Search Results for "${effectiveSearch}"`
    : effectiveCategory 
      ? `${effectiveCategory} Parts`
      : 'All Products'

  return (
    <div className="container">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
        <p className="text-gray-400 mb-8">Showing {products.length} of {totalCount} products</p>

        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => onProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} onError={(e) => {
                  e.target.src = blLogo;
                }} />
              </div>
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-sku">SKU: {product.sku}</div>
              <div className="product-rating">
                <div className="stars">★★★★☆</div>
                <span className="rating-text">({product.review_count})</span>
              </div>
              <div className="product-price">£{product.price.toFixed(2)}</div>
              <button 
                className="add-to-cart"
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(product)
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Cart Page Component
function CartPage({ cartItems, setCartItems }) {
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id))
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-700">
              <div className="product-image w-20 h-20"></div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-400">SKU: {item.sku}</p>
                <p className="text-yellow-500 font-bold">£{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-700 rounded"
                >
                  -
                </button>
                <span className="w-12 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-700 rounded"
                >
                  +
                </button>
              </div>
              <div className="font-bold">£{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          
          <div className="mt-8 text-right">
            <div className="text-2xl font-bold mb-4">Total: £{total.toFixed(2)}</div>
            <button className="btn-primary">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}

// About Page Component
function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">About B&L Motorcycles</h1>
      <div className="max-w-4xl">
        <p className="text-lg mb-6">
          B&L Motorcycles Ltd has been serving the motorcycle community for over 15 years, providing high-quality parts and accessories for all types of motorcycles.
        </p>
        <p className="mb-6">
          Based in Fareham, Hampshire, we stock over 36,000 motorcycle parts from leading manufacturers. Our commitment to quality and customer service has made us a trusted name in the motorcycle industry.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">Our Mission</h3>
            <p>To provide motorcycle enthusiasts with the highest quality parts and exceptional service, ensuring every ride is safe and enjoyable.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-500">Why Choose Us</h3>
            <ul className="space-y-2">
              <li>• Over 36,000 parts in stock</li>
              <li>• Fast 24-hour delivery available</li>
              <li>• Expert technical support</li>
              <li>• Competitive prices</li>
              <li>• 15+ years of experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Page Component
function ContactPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">Get in Touch</h3>
          <div className="space-y-4">
            <div>
              <strong>Phone:</strong> 07881274193
            </div>
            <div>
              <strong>Email:</strong> brett@blmotorcyclesltd.co.uk
            </div>
            <div>
              <strong>Address:</strong> Fareham, Hampshire
            </div>
            <div>
              <strong>Business Hours:</strong><br />
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 9:00 AM - 4:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-yellow-500">Send us a Message</h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <textarea 
              placeholder="Your Message" 
              rows="4"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            ></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [cartItems, setCartItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Test Supabase connection on app load
  useEffect(() => {
    console.log('App loaded - Supabase connection ready')
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (term) => {
    setSearchTerm(term)
    setCategoryFilter('')
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const closeProductDetail = () => {
    setSelectedProduct(null)
  }

  return (
    <Router>
      <div className="App">
        <Header 
          cartCount={cartCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/products" 
              element={
                <ProductsPage 
                  searchTerm={searchTerm}
                  categoryFilter={categoryFilter}
                  onProductClick={handleProductClick}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              } 
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            onClose={closeProductDetail}
          />
        )}
      </div>
    </Router>
  )
}

export default App


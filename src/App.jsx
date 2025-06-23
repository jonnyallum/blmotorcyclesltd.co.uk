import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { loadStripe } from '@stripe/stripe-js'
import './App.css'

// Initialize Supabase
const supabase = createClient(
  'https://kenaardqwnpeqtwukdnb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbmFhcmRxd25wZXF0d3VrZG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzkwMzcsImV4cCI6MjA2MjcxNTAzN30.eOfY8zr3E5hljBDyUuP5d1VIyvuusf9SHSAU5P88UyU'
)

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51RT6VLRpcmImawCCfRjWE7c6it86RxoZGRY2084WJkj5BZxCleehMuvagx0fAljVmm1rx6IiqzKVH838yHaJ63Po00FI4bfOVl')

// Cart Context
export const CartContext = React.createContext()

// Header Component
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart } = React.useContext(CartContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'All Parts', path: '/products', icon: '🔧' },
    { label: 'Brakes', path: '/products?category=brakes', icon: '🛑' },
    { label: 'Suspension', path: '/products?category=suspension', icon: '🔩' },
    { label: 'Electrical', path: '/products?category=electrical', icon: '⚡' },
    { label: 'Accessories', path: '/products?category=accessories', icon: '🏍️' },
    { label: 'About', path: '/about', icon: 'ℹ️' },
    { label: 'Contact', path: '/contact', icon: '📞' }
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="contact-info">
            <span>📞 07881274193</span>
            <span>📧 brett@blmotorcyclesltd.co.uk</span>
            <span>📍 Fareham, Hampshire</span>
          </div>
          <div className="top-actions">
            <span>🚚 Free Delivery on orders over £50</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/src/assets/bl-logo-correct.png" alt="B&L Motorcycles" />
            <div className="logo-text">
              <h1>B&L Motorcycles</h1>
              <p>Premium Parts & Accessories</p>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search 36,000+ motorcycle parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="header-actions">
            <button className="support-btn">
              🛠️ Expert Support
            </button>
            <Link to="/cart" className="cart-btn">
              🛒 Cart {cartItemCount > 0 && <span>({cartItemCount})</span>}
            </Link>
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <div className="container">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

// HomePage Component
const HomePage = () => {
  const { addToCart } = React.useContext(CartContext)

  const featuredProducts = [
    {
      id: 1,
      name: "V-Twin Engine Kit",
      price: 899.99,
      image: "/src/assets/images/engine-chrome.jpg",
      category: "Engine",
      rating: 4.5,
      reviews: 89
    },
    {
      id: 2,
      name: "Premium Brake Set",
      price: 299.99,
      image: "/src/assets/images/motorcycle-chrome.jpg",
      category: "Brakes",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 3,
      name: "Suspension Kit",
      price: 549.99,
      image: "/src/assets/images/workshop.jpg",
      category: "Suspension",
      rating: 4.6,
      reviews: 73
    }
  ]

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Premium Motorcycle Parts & Accessories</h1>
            <p>Discover our extensive collection of over 36,000 high-quality motorcycle parts. From engine components to electrical systems, we have everything you need to keep your bike running perfectly.</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="number">36,000+</span>
                <span className="label">Parts Available</span>
              </div>
              <div className="stat">
                <span className="number">24hr</span>
                <span className="label">Delivery Available</span>
              </div>
              <div className="stat">
                <span className="number">99.8%</span>
                <span className="label">Customer Satisfaction</span>
              </div>
              <div className="stat">
                <span className="number">15+</span>
                <span className="label">Years Experience</span>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/products" className="cta-button primary">Browse All Parts</Link>
              <Link to="/contact" className="cta-button secondary">Get Expert Advice</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/src/assets/bl-logo-correct.png" alt="B&L Motorcycles" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2>Why Choose B&L Motorcycles?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔧</div>
              <h3>Expert Support</h3>
              <p>Technical assistance from experienced professionals with 15+ years in the industry.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Same-day dispatch on orders placed before 2pm, with next-day delivery available.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>Only the highest quality parts from trusted manufacturers and suppliers.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with regular discounts and bulk order savings available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <div className="rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                  <p className="price">£{product.price}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ProductsPage Component
const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useState(new URLSearchParams(window.location.search))
  const { addToCart } = React.useContext(CartContext)

  useEffect(() => {
    // Simulate loading products from Supabase
    const loadProducts = async () => {
      setLoading(true)
      
      // Mock product data - in real app this would come from Supabase
      const mockProducts = [
        {
          id: 1,
          name: "Bike It 'Nautica' Outdoor Motorcycle Rain Cover for Medium sized Motorcycles",
          sku: "RCOBLK03",
          price: 19.99,
          rating: 4,
          reviews: 51,
          image: "/src/assets/images/motorcycle-chrome.jpg",
          category: "Accessories"
        },
        {
          id: 2,
          name: "Bike It 'Nautica' Outdoor Motorcycle Rain Cover for Large sized Motorcycles",
          sku: "RCOBLK04",
          price: 22.49,
          rating: 4,
          reviews: 56,
          image: "/src/assets/images/engine-chrome.jpg",
          category: "Accessories"
        },
        {
          id: 3,
          name: "Bike It 'Nautica' Outdoor Motorcycle Rain Cover for Extra Large motorcycles",
          sku: "RCOBLK05",
          price: 24.99,
          rating: 4,
          reviews: 53,
          image: "/src/assets/images/workshop.jpg",
          category: "Accessories"
        }
      ]

      setTimeout(() => {
        setProducts(mockProducts)
        setLoading(false)
      }, 1000)
    }

    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1>All Products</h1>
        <p className="products-count">Showing {products.length} of 36494 products</p>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="sku">SKU: {product.sku}</p>
                <div className="rating">
                  <span className="stars">{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
                <p className="price">£{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// AboutPage Component
const AboutPage = () => (
  <div className="about-page">
    <div className="container">
      <h1>About B&L Motorcycles</h1>
      
      <div className="about-content">
        <div className="about-text">
          <p>B&L Motorcycles Ltd has been serving the motorcycle community for over 15 years, providing high-quality parts and accessories for all types of motorcycles.</p>
          
          <p>Based in Fareham, Hampshire, we stock over 36,000 motorcycle parts from leading manufacturers. Our commitment to quality and customer service has made us a trusted name in the motorcycle industry.</p>
          
          <div className="mission-section">
            <h2>Our Mission</h2>
            <p>To provide motorcycle enthusiasts with the highest quality parts and exceptional service, ensuring every ride is safe and enjoyable.</p>
          </div>
        </div>
        
        <div className="why-choose-us">
          <h2>Why Choose Us</h2>
          <ul>
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

// ContactPage Component
const ContactPage = () => (
  <div className="contact-page">
    <div className="container">
      <h1>Contact Us</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="contact-item">
            <span className="icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>07881274193</p>
            </div>
          </div>
          
          <div className="contact-item">
            <span className="icon">📧</span>
            <div>
              <h3>Email</h3>
              <p>brett@blmotorcyclesltd.co.uk</p>
            </div>
          </div>
          
          <div className="contact-item">
            <span className="icon">📍</span>
            <div>
              <h3>Location</h3>
              <p>Fareham, Hampshire</p>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

// CartPage Component
const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = React.useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-shopping">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">£{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                £{(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="total">
            <strong>Total: £{cartTotal.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}

// Footer Component
const Footer = () => (
  <footer className="main-footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/src/assets/bl-logo-correct.png" alt="B&L Motorcycles" />
            <h3>B&L Motorcycles</h3>
          </div>
          <p>Premium motorcycle parts and accessories for over 15 years.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📞 07881274193</p>
          <p>📧 brett@blmotorcyclesltd.co.uk</p>
          <p>📍 Fareham, Hampshire</p>
        </div>
        
        <div className="footer-section">
          <h3>Customer Service</h3>
          <p>🚚 Free delivery over £50</p>
          <p>🔧 Expert technical support</p>
          <p>⚡ Fast 24hr delivery</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 B&L Motorcycles Ltd. All rights reserved.</p>
        <div className="made-with">
          <span>🚀 Made with Manus</span>
        </div>
      </div>
    </div>
  </footer>
)

// Main App Component
function App() {
  const [cart, setCart] = useState([])

  // Cart management functions
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prevCart, { ...product, quantity }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const cartContextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    supabase,
    stripePromise
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  )
}

export default App


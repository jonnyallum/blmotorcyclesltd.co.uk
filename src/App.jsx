import React, { useState, createContext, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { loadStripe } from '@stripe/stripe-js'
import { Search, ShoppingCart, Phone, Mail, MapPin, Menu, X, Wrench, Truck, Gem, DollarSign, Star, Award, Shield, Zap } from 'lucide-react'
import './App.css'

// Initialize Supabase
const supabase = createClient(
  'https://jpfjyyagdnveumasrgdz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZmp5eWFnZG52ZXVtYXNyZ2R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjQ1MzAsImV4cCI6MjA2MTE0MDUzMH0.Quy4kHgjTxezqomC6kvLnhPgLbBHoh7DyAMqTt4d76Q'
)

// Initialize Stripe
const stripePromise = loadStripe('pk_live_51RL9bcFxt9vVAIGqk6p1qhz7N3EU0kJlsdw4WD733vjbs3wTdh4G6AH04oyGHmEADsxXOn4cOHV57eegZezYeRkS00jGZE6iQt')

// Cart Context
const CartContext = createContext()

// Header Component
const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart } = useContext(CartContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'All Parts', path: '/products', icon: '🔧' },
    { label: 'Engine', path: '/products?category=engine', icon: '⚙️' },
    { label: 'Brakes', path: '/products?category=brakes', icon: '🛑' },
    { label: 'Suspension', path: '/products?category=suspension', icon: '🔩' },
    { label: 'Electrical', path: '/products?category=electrical', icon: '⚡' },
    { label: 'About', path: '/about', icon: 'ℹ️' },
    { label: 'Contact', path: '/contact', icon: '📞' }
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bl-top-bar py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>07881274193</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              <span>brett@blmotorcyclesltd.co.uk</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Fareham, Hampshire</span>
            </span>
          </div>
          <div className="bl-gold-text font-semibold flex items-center space-x-2">
            <Truck className="w-4 h-4" />
            <span>Free Delivery on orders over £50</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bl-header py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 bl-fade-in group">
              <img 
                src="/src/assets/bl-logo-correct.png" 
                alt="B&L Motorcycles" 
                className="h-12 w-auto bl-logo"
              />
              <div>
                <h1 className="text-xl font-bold bl-gold-text group-hover:text-primary transition-colors">
                  B&L Motorcycles
                </h1>
                <p className="text-sm text-muted-foreground">Premium Parts & Accessories</p>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search 36,000+ motorcycle parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bl-search-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
              </div>
              <button 
                type="submit"
                className="bl-cta-primary px-6 py-2 rounded-lg font-semibold"
              >
                Search
              </button>
            </form>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 bl-nav-link group">
                <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Expert Support</span>
              </button>
              
              <Link to="/cart" className="flex items-center space-x-2 bl-nav-link relative group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold bl-pulse-glow">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <button 
                className="md:hidden bl-nav-link"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`mt-4 ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`bl-nav-link flex items-center space-x-2 transition-all ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden mt-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bl-search-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit"
                className="bl-cta-primary px-4 py-2 rounded-lg"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </header>
    </>
  )
}

// HomePage Component
const HomePage = () => {
  const { addToCart } = useContext(CartContext)

  const featuredProducts = [
    {
      id: 1,
      name: "V-Twin Engine Kit",
      price: 899.99,
      image: "/src/assets/images/chrome-engine-detail.jpg",
      category: "Engine",
      description: "Premium V-Twin engine components for superior performance",
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      name: "Custom Chrome Engine",
      price: 1299.99,
      image: "/src/assets/images/custom-chrome-engine.webp",
      category: "Engine",
      description: "Hand-crafted chrome engine with precision engineering",
      rating: 5.0,
      reviews: 89
    },
    {
      id: 3,
      name: "CNC Machined Parts",
      price: 549.99,
      image: "/src/assets/images/cnc-parts.jpeg",
      category: "Components",
      description: "Precision CNC machined motorcycle components",
      rating: 4.8,
      reviews: 203
    }
  ]

  const features = [
    {
      icon: <Wrench className="w-8 h-8 bl-feature-icon" />,
      title: "Expert Support",
      description: "Technical assistance from experienced professionals with 15+ years in the industry.",
      highlight: "15+ Years Experience"
    },
    {
      icon: <Truck className="w-8 h-8 bl-feature-icon" />,
      title: "Fast Delivery",
      description: "Same-day dispatch on orders placed before 2pm, with next-day delivery available.",
      highlight: "Same-Day Dispatch"
    },
    {
      icon: <Shield className="w-8 h-8 bl-feature-icon" />,
      title: "Quality Guarantee",
      description: "Only the highest quality parts from trusted manufacturers with full warranty.",
      highlight: "Full Warranty"
    },
    {
      icon: <Award className="w-8 h-8 bl-feature-icon" />,
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and bulk order savings available.",
      highlight: "Price Match Promise"
    }
  ]

  const stats = [
    { number: "36,000+", label: "Parts Available", icon: <Wrench className="w-6 h-6" /> },
    { number: "24hr", label: "Delivery Available", icon: <Truck className="w-6 h-6" /> },
    { number: "99.8%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "15+", label: "Years Experience", icon: <Award className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bl-hero-section py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bl-slide-in">
              <h1 className="text-4xl lg:text-6xl font-bold bl-gold-text mb-6 leading-tight">
                Premium Motorcycle Parts & Accessories
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover our extensive collection of over 36,000 high-quality motorcycle parts. 
                From engine components to electrical systems, we have everything you need to keep your bike running perfectly.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bl-stat-container text-center p-4 rounded-lg">
                    <div className="flex justify-center mb-2 text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold bl-stat-number mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs lg:text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="bl-cta-primary px-8 py-3 rounded-lg font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Browse All Parts</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="bl-cta-secondary px-8 py-3 rounded-lg font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Get Expert Advice</span>
                </Link>
              </div>
            </div>

            <div className="bl-fade-in flex justify-center">
              <img 
                src="/src/assets/bl-logo-correct.png" 
                alt="B&L Motorcycles" 
                className="max-w-md w-full h-auto bl-logo bl-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bl-gold-text mb-4">
              Why Choose B&L Motorcycles?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the highest quality motorcycle parts and exceptional service to keep you riding with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bl-card p-6 rounded-lg text-center bl-fade-in group">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold bl-gold-text mb-3">
                  {feature.title}
                </h3>
                <div className="text-sm text-primary font-semibold mb-3">
                  {feature.highlight}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bl-gold-text mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and highest-rated motorcycle parts, trusted by professionals and enthusiasts alike.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bl-product-card rounded-lg overflow-hidden bl-fade-in group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover bl-product-image"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold bl-gold-text mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-muted-foreground'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bl-gold-text">
                      £{product.price}
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bl-cta-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bl-card p-6 rounded-lg">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold bl-gold-text mb-2">Secure Shopping</h3>
              <p className="text-muted-foreground">SSL encrypted checkout and secure payment processing</p>
            </div>
            <div className="bl-card p-6 rounded-lg">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold bl-gold-text mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">All parts tested and certified by our expert team</p>
            </div>
            <div className="bl-card p-6 rounded-lg">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold bl-gold-text mb-2">Fast Support</h3>
              <p className="text-muted-foreground">Expert technical support available 6 days a week</p>
            </div>
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
  const location = useLocation()
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      const allProducts = [
        { 
          id: 1, 
          name: "V-Twin Engine Kit", 
          price: 899.99, 
          category: "engine", 
          image: "/src/assets/images/chrome-engine-detail.jpg",
          rating: 4.9,
          reviews: 127
        },
        { 
          id: 2, 
          name: "Custom Chrome Engine", 
          price: 1299.99, 
          category: "engine", 
          image: "/src/assets/images/custom-chrome-engine.webp",
          rating: 5.0,
          reviews: 89
        },
        { 
          id: 3, 
          name: "CNC Machined Parts", 
          price: 549.99, 
          category: "suspension", 
          image: "/src/assets/images/cnc-parts.jpeg",
          rating: 4.8,
          reviews: 203
        },
        { 
          id: 4, 
          name: "LED Headlight", 
          price: 149.99, 
          category: "electrical", 
          image: "/src/assets/images/chrome-engine-detail.jpg",
          rating: 4.7,
          reviews: 156
        },
        { 
          id: 5, 
          name: "Chrome Exhaust", 
          price: 399.99, 
          category: "engine", 
          image: "/src/assets/images/custom-chrome-engine.webp",
          rating: 4.9,
          reviews: 98
        },
        { 
          id: 6, 
          name: "Brake Pads", 
          price: 79.99, 
          category: "brakes", 
          image: "/src/assets/images/cnc-parts.jpeg",
          rating: 4.6,
          reviews: 234
        },
      ]
      
      const searchParams = new URLSearchParams(location.search)
      const category = searchParams.get('category')
      const search = searchParams.get('search')
      
      let filteredProducts = allProducts
      
      if (category) {
        filteredProducts = allProducts.filter(p => p.category === category)
      }
      
      if (search) {
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setProducts(filteredProducts)
      setLoading(false)
    }, 1000)
  }, [location.search])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="bl-gold-text">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold bl-gold-text mb-8">All Products</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bl-product-card rounded-lg overflow-hidden bl-fade-in group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover bl-product-image"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold capitalize">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold bl-gold-text mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-muted-foreground'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bl-gold-text">
                    £{product.price}
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bl-cta-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No products found.</p>
            <Link to="/products" className="bl-cta-primary px-6 py-3 rounded-lg font-semibold inline-block">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// AboutPage Component
const AboutPage = () => (
  <div className="min-h-screen py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold bl-gold-text mb-8">About B&L Motorcycles</h1>
      <div className="bl-card p-8 rounded-lg space-y-6">
        <p className="text-lg text-muted-foreground leading-relaxed">
          We are a leading supplier of premium motorcycle parts and accessories, serving customers across the UK with over 36,000 products in stock.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          With over 15 years of experience in the motorcycle industry, our team of experts is dedicated to providing you with the highest quality parts and exceptional customer service.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          From engine components to electrical systems, we stock everything you need to keep your motorcycle running at its best. Our commitment to quality and customer satisfaction has made us a trusted name in the motorcycle community.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bl-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold bl-gold-text mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To provide motorcycle enthusiasts with the highest quality parts and expert support to keep them riding safely and confidently.
            </p>
          </div>
          <div className="bl-card p-6 rounded-lg">
            <h3 className="text-xl font-semibold bl-gold-text mb-3">Our Values</h3>
            <p className="text-muted-foreground">
              Quality, reliability, and customer satisfaction are at the heart of everything we do. We believe in building lasting relationships with our customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ContactPage Component
const ContactPage = () => (
  <div className="min-h-screen py-20 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold bl-gold-text mb-8">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bl-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold bl-gold-text mb-6">Get in Touch</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span>07881274193</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span>brett@blmotorcyclesltd.co.uk</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <MapPin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span>Fareham, Hampshire</span>
            </div>
          </div>
        </div>
        
        <div className="bl-card p-8 rounded-lg">
          <h2 className="text-2xl font-semibold bl-gold-text mb-6">Business Hours</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Monday - Friday:</span>
              <span className="text-primary font-semibold">9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-primary font-semibold">9:00 AM - 4:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-muted-foreground">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// CartPage Component
const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold bl-gold-text mb-8">Your Cart</h1>
          <div className="bl-card p-12 rounded-lg">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-6">Your cart is empty.</p>
            <Link to="/products" className="bl-cta-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bl-gold-text mb-8">Your Cart</h1>
        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div key={item.id} className="bl-card p-6 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold bl-gold-text">{item.name}</h3>
                  <p className="text-muted-foreground">£{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-destructive hover:text-destructive/80 transition-all"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bl-card p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold bl-gold-text">£{cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full bl-cta-primary py-3 rounded-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

// Footer Component
const Footer = () => (
  <footer className="bl-footer py-12 px-4 mt-20">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/src/assets/bl-logo-correct.png" 
              alt="B&L Motorcycles" 
              className="h-8 w-auto bl-logo"
            />
            <span className="font-bold bl-gold-text">B&L Motorcycles</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Premium motorcycle parts and accessories for enthusiasts and professionals.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold bl-gold-text mb-4">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/products" className="block text-muted-foreground hover:text-primary transition-all">All Products</Link>
            <Link to="/about" className="block text-muted-foreground hover:text-primary transition-all">About Us</Link>
            <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-all">Contact</Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold bl-gold-text mb-4">Categories</h3>
          <div className="space-y-2">
            <Link to="/products?category=engine" className="block text-muted-foreground hover:text-primary transition-all">Engine Parts</Link>
            <Link to="/products?category=brakes" className="block text-muted-foreground hover:text-primary transition-all">Brakes</Link>
            <Link to="/products?category=suspension" className="block text-muted-foreground hover:text-primary transition-all">Suspension</Link>
            <Link to="/products?category=electrical" className="block text-muted-foreground hover:text-primary transition-all">Electrical</Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold bl-gold-text mb-4">Contact Info</h3>
          <div className="space-y-2 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>07881274193</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>brett@blmotorcyclesltd.co.uk</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Fareham, Hampshire</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
        <p>&copy; 2025 B&L Motorcycles Ltd. All rights reserved.</p>
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
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
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


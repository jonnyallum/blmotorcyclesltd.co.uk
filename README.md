# B&L Motorcycles Ltd - Premium Motorcycle Parts Website

![B&L Motorcycles](https://img.shields.io/badge/B%26L-Motorcycles-gold?style=for-the-badge&logo=motorcycle)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple?style=for-the-badge&logo=vite)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 🏍️ About B&L Motorcycles

B&L Motorcycles Ltd is a premium motorcycle parts and accessories retailer based in Fareham, Hampshire. With over 15 years of experience in the motorcycle industry, we provide high-quality parts and exceptional service to motorcycle enthusiasts across the UK.

## 🌐 Live Website

**Production URL:** [https://dkrtaebh.manus.space](https://dkrtaebh.manus.space)

## ✨ Features

### 🛒 E-commerce Functionality
- **36,000+ Products** - Extensive inventory of motorcycle parts
- **Real-time Product Data** - Live pricing and availability
- **Shopping Cart** - Full cart functionality with quantity management
- **Product Categories** - Organized by Engine, Brakes, Suspension, Electrical, Accessories
- **Search Functionality** - Find parts quickly and easily

### 🎨 Design & User Experience
- **Gold on Black Theme** - Professional and distinctive branding
- **Responsive Design** - Perfect on desktop, tablet, and mobile
- **Smooth Animations** - Enhanced user experience with micro-interactions
- **Fast Loading** - Optimized for performance
- **Accessibility** - High contrast and keyboard navigation

### 📱 Mobile Optimized
- **Touch-Friendly Interface** - Optimized for mobile devices
- **Responsive Navigation** - Collapsible menu for small screens
- **Mobile Performance** - Fast loading on all devices
- **Touch Gestures** - Smooth scrolling and interactions

## 🚀 Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 6.3.5** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **CSS3** - Custom styling with animations and responsive design

### Backend Integration
- **Supabase** - Database and real-time data
- **Stripe** - Payment processing
- **eBay API** - Product listings integration

### Development Tools
- **pnpm** - Fast package manager
- **ESLint** - Code linting
- **Git** - Version control

## 📦 Installation & Setup

### Prerequisites
- Node.js 20.18.0 or higher
- pnpm (recommended) or npm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/jonnyallum/blmotorcyclesltd.co.uk.git
cd blmotorcyclesltd.co.uk

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Environment Variables
Create a `.env` file in the root directory:
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://kenaardqwnpeqtwukdnb.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🏗️ Project Structure

```
bl-motorcycles-new/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # React components
│   ├── App.jsx           # Main application component
│   ├── App.css           # Global styles and animations
│   └── main.jsx          # Application entry point
├── dist/                  # Production build output
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 🎯 Key Components

### Navigation
- **Header Navigation** - Logo, search, cart, and main menu
- **Category Navigation** - Product categories with icons
- **Mobile Menu** - Responsive navigation for mobile devices

### Pages
- **Homepage** - Hero section, features, and featured products
- **Products** - Product listings with filtering and search
- **Product Detail** - Individual product information
- **Cart** - Shopping cart management
- **About** - Company information and mission
- **Contact** - Contact form and business details

### Features
- **Product Cards** - Professional product display with ratings
- **Search Form** - Real-time product search
- **Cart Management** - Add, remove, and update quantities
- **Responsive Design** - Mobile-first approach

## 🎨 Design System

### Color Palette
- **Primary Gold:** `#D4AF37` - Main brand color
- **Background Black:** `#000000` - Primary background
- **Secondary Dark:** `#111111` - Card backgrounds
- **Border Gray:** `#333333` - Borders and dividers
- **Text Gray:** `#888888` - Secondary text

### Typography
- **Primary Font:** Inter, system fonts
- **Headings:** Bold weights for hierarchy
- **Body Text:** Regular weight for readability

### Animations
- **Hover Effects** - Smooth transitions on interactive elements
- **Page Transitions** - Smooth navigation between pages
- **Micro-interactions** - Enhanced user feedback
- **GPU Acceleration** - Optimized for performance

## 📊 Performance

### Bundle Sizes
- **CSS:** 95.83 kB (15.92 kB gzipped)
- **JavaScript:** 355.32 kB (107.86 kB gzipped)
- **HTML:** 0.51 kB (0.33 kB gzipped)

### Performance Metrics
- **Build Time:** ~2 seconds
- **Page Load:** < 1 second
- **Lighthouse Score:** 95+ (estimated)
- **Mobile Optimized:** Perfect responsive design

## 🛠️ Development

### Available Scripts
```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint

# Deployment
pnpm run deploy       # Deploy to production
```

### Code Style
- **ESLint** - Consistent code formatting
- **Prettier** - Code formatting (recommended)
- **Modern JavaScript** - ES6+ features
- **React Hooks** - Functional components with hooks

## 🚀 Deployment

### Production Build
```bash
# Create optimized production build
pnpm run build

# The dist/ folder contains the production-ready files
```

### Deployment Options
- **Manus Platform** - Current deployment
- **Netlify** - Static site hosting
- **Vercel** - React application hosting
- **GitHub Pages** - Free static hosting

## 📞 Contact Information

### Business Details
- **Company:** B&L Motorcycles Ltd
- **Phone:** 07881274193
- **Email:** brett@blmotorcyclesltd.co.uk
- **Location:** Fareham, Hampshire, UK

### Support
- **Technical Support:** Available during business hours
- **Customer Service:** Expert motorcycle parts advice
- **Delivery:** Fast 24-hour delivery available
- **Returns:** Competitive return policy

## 📄 License

This project is proprietary software owned by B&L Motorcycles Ltd. All rights reserved.

## 🤝 Contributing

This is a private repository for B&L Motorcycles Ltd. For business inquiries or technical support, please contact us directly.

## 📈 Roadmap

### Planned Features
- [ ] Advanced product filtering
- [ ] Customer accounts and login
- [ ] Order tracking system
- [ ] Live chat support
- [ ] Product reviews and ratings
- [ ] Wishlist functionality

### Technical Improvements
- [ ] Progressive Web App (PWA)
- [ ] Advanced caching strategies
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] A/B testing framework

---

**Built with ❤️ by the B&L Motorcycles team**

*Keeping your motorcycle running perfectly since 2008*


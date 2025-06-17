# B&L Motorcycles Website - Deployment Guide

## 🚀 Production Deployment

### Current Live Website
**Production URL:** https://mvmxujdy.manus.space

### Deployment Options

#### Option 1: Static Hosting (Recommended)
The website is built as a static React application and can be deployed to any static hosting provider:

- **Netlify** - Drag and drop the `dist/` folder
- **Vercel** - Connect GitHub repository for automatic deployments
- **GitHub Pages** - Enable GitHub Pages in repository settings
- **Cloudflare Pages** - Connect repository for automatic builds
- **AWS S3 + CloudFront** - Upload `dist/` folder to S3 bucket

#### Option 2: Traditional Web Hosting
Upload the contents of the `dist/` folder to your web hosting provider's public directory (usually `public_html/` or `www/`).

### Build Process
```bash
# Install dependencies
pnpm install

# Build for production
pnpm run build

# The dist/ folder contains all files needed for deployment
```

### Important Deployment Notes

#### React Router Configuration
The website uses React Router for client-side routing. For proper routing support:

1. **For Apache servers:** Add `.htaccess` file:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

2. **For Nginx servers:** Add to server configuration:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

3. **For static hosting providers:** Most modern providers (Netlify, Vercel) handle this automatically.

#### Environment Variables
The website uses the following environment variables (already configured):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase database URL
- `NEXT_PUBLIC_SUPABASE_KEY` - Supabase public API key

#### Performance Optimization
The website is already optimized for production:
- ✅ Minified JavaScript and CSS
- ✅ Optimized images
- ✅ Efficient bundle splitting
- ✅ Fast loading times

### Custom Domain Setup

To use your own domain (e.g., www.blmotorcyclesltd.co.uk):

1. **DNS Configuration:**
   - Point your domain to your hosting provider
   - Add CNAME record for `www` subdomain
   - Configure SSL certificate

2. **Hosting Provider Setup:**
   - Add custom domain in hosting provider settings
   - Enable HTTPS/SSL
   - Configure redirects (www to non-www or vice versa)

### Monitoring & Analytics

Consider adding:
- **Google Analytics** - Track website traffic and user behavior
- **Google Search Console** - Monitor search performance
- **Performance Monitoring** - Track loading times and errors

### Backup & Version Control

- ✅ Source code is version controlled with Git
- ✅ Repository: https://github.com/jonnyallum/blmotorcyclesltd.co.uk
- ✅ Regular commits with descriptive messages
- ✅ Production builds are reproducible

### Security Considerations

- ✅ No sensitive data exposed in frontend code
- ✅ API keys are properly scoped (public keys only)
- ✅ HTTPS enforced for all connections
- ✅ No server-side vulnerabilities (static site)

### Maintenance

#### Regular Updates
- Update dependencies monthly: `pnpm update`
- Monitor for security vulnerabilities
- Test functionality after updates

#### Content Updates
- Product information can be updated in the React components
- Images can be replaced in the `src/assets/images/` directory
- Business information can be updated in the contact components

#### Performance Monitoring
- Monitor loading times regularly
- Check mobile performance
- Optimize images if needed

### Support & Troubleshooting

#### Common Issues
1. **Routing not working:** Ensure proper server configuration for React Router
2. **Images not loading:** Check image paths and file extensions
3. **Slow loading:** Optimize images and check hosting provider performance

#### Getting Help
- **Technical Support:** brett@blmotorcyclesltd.co.uk
- **Documentation:** This deployment guide
- **Repository:** GitHub issues for technical problems

---

**Deployment Status: ✅ READY FOR PRODUCTION**

The website has been thoroughly tested and is ready for production deployment with excellent performance, mobile responsiveness, and professional design.


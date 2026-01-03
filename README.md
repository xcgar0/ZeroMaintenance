# ZeroMaintenance.co - Professional Property Maintenance & Junk Removal

A premium, fully-responsive website for ZeroMaintenance - a professional property maintenance and junk removal company serving Wise County, Denton County, and Tarrant County, Texas.

## ✨ Features

- **🎨 Premium Design** - Top-tier animations, typography, and visual effects
- **📱 Full Mobile Support** - Optimized for all devices with responsive design
- **⚡ Advanced Animations** - Smooth scroll-triggered animations and micro-interactions
- **📧 Automated Email System** - Instant quote request notifications via EmailJS
- **🎯 Local SEO Optimized** - Targeted for Wise, Denton, and Tarrant counties
- **🚀 Performance Optimized** - Fast loading with modern web standards
- **♿ Accessibility Ready** - WCAG compliant design and interactions
- **🏠 Property Maintenance Focus** - Expanding beyond junk removal to comprehensive property services

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in your web browser, or use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

2. **View the site**: Navigate to `http://localhost:8000` in your browser

## ⚙️ Setup Instructions

### 1. Email Integration (Required for Quote Forms)

**📖 Complete Guide:** See [`emailjs-setup.md`](emailjs-setup.md) for detailed step-by-step instructions.

**Quick Setup:** Get your EmailJS keys and update `script.js`:
- Public Key → Replace `YOUR_PUBLIC_KEY`
- Service ID → Replace `YOUR_SERVICE_ID`  
- Template IDs → Replace `YOUR_TEMPLATE_ID`
- Your Email → Replace `your-email@domain.com`

3. **Create Email Templates**:
   - Go to Email Templates → Create New Template
   - **Business Notification Template** (for you):
     ```
     Subject: New Quote Request from {{from_name}}

     New quote request received:

     Customer: {{from_name}}
     Email: {{from_email}}
     Phone: {{phone}}
     Address: {{address}}
     Service: {{service_type}}
     Description: {{description}}
     Preferred Date: {{preferred_date}}
     Additional Info: {{additional_info}}

     Please contact the customer to discuss details and arrange for photos.
     ```
   - **Customer Confirmation Template**:
     ```
     Subject: Quote Request Received - ZeroMaintenance

     Hi {{to_name}},

     Thank you for your interest in ZeroMaintenance!

     We've received your quote request for {{service_type}} and will contact you via phone or text to get pictures and provide an accurate quote.

     Service Details:
     - Address: {{address}}
     - Description: {{description}}

     We'll be in touch soon!

     Best regards,
     ZeroMaintenance Team
     ```

4. **Update JavaScript**:
   - Open `script.js`
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace both `YOUR_TEMPLATE_ID` instances with your template IDs
   - Replace `your-email@domain.com` with your actual email

## 📁 File Structure

```
zeromaintenence/
├── index.html               # Main website
├── styles.css              # All styling (1462+ lines)
├── script.js               # JavaScript functionality (391+ lines)
├── README.md               # This documentation
├── uptime-strategy.md      # 100% uptime configuration guide
├── emailjs-setup.md        # EmailJS configuration guide
├── deploy.sh               # Linux/Mac deployment script
├── deploy.bat              # Windows deployment script
├── monitor.sh              # Linux/Mac monitoring script
├── monitor.bat             # Windows monitoring script
└── [other files...]
```

## 🎨 Design Features

### Typography
- **Primary Font**: Poppins (Google Fonts) - Modern, clean, and highly readable
- **Weights**: 300, 400, 500, 600, 700, 800, 900 for optimal hierarchy
- **Anti-aliasing**: Optimized for crisp text rendering

### Animations
- **Scroll-triggered animations** using Intersection Observer API
- **Smooth transitions** with cubic-bezier easing functions
- **Micro-interactions** on buttons, cards, and navigation
- **Performance optimized** with hardware acceleration

### Mobile Experience
- **Responsive grid system** that adapts to all screen sizes
- **Touch-friendly interactions** with proper tap targets
- **Optimized typography scaling** using clamp() functions
- **Mobile-first navigation** with smooth hamburger menu

### Visual Effects
- **Gradient backgrounds** and text effects
- **Backdrop blur** effects for modern glass-morphism
- **Box shadows** with multiple layers for depth
- **Hover states** with transform and color transitions

## 📱 Mobile Optimization

- **Breakpoint Strategy**: 480px, 768px, 1024px, 1200px
- **Flexible Typography**: Uses `clamp()` for responsive text sizing
- **Touch Interactions**: 44px minimum touch targets
- **Performance**: Optimized animations and reduced motion support

## 🔧 Technical Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with custom properties, grid, flexbox
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **EmailJS** - Client-side email sending
- **Google Fonts** - Premium typography
- **Font Awesome** - Icon library

## 📊 Performance Features

- **Lazy Loading**: Intersection Observer for animations
- **Optimized Assets**: Efficient CSS and minimal JavaScript
- **Fast Fonts**: Preconnected Google Fonts with display swap
- **Reduced Motion**: Respects user preferences
- **Minimal Dependencies**: Only essential libraries

## 🎯 Business Features

- **Local SEO**: Optimized for Wise, Denton, and Tarrant counties
- **Professional Branding**: Premium design that builds trust
- **Lead Generation**: Automated quote request system
- **Mobile Commerce**: Optimized for mobile quote requests
- **Scalable Architecture**: Easy to add new features

## 🚀 Deployment Ready

The website is production-ready and can be deployed to:

- **GitHub Pages** (Recommended) - Free hosting with global CDN
- **GitLab Pages** (Backup) - Free alternative hosting
- **Netlify** - Drag & drop deployment
- **Vercel** - Git integration with automatic deployments
- **Traditional Hosting** - FTP upload to any web host

## 🛡️ 100% Uptime Strategy

For maximum reliability with minimal third-party dependencies, see [`uptime-strategy.md`](uptime-strategy.md) for:

- **Multi-provider hosting** setup
- **DNS load balancing** configuration
- **Automated deployment** scripts
- **Uptime monitoring** tools
- **Failover procedures**

### Quick Uptime Setup:
1. **Deploy to GitHub Pages** (free)
2. **Deploy to GitLab Pages** (free backup)
3. **Configure GoDaddy DNS** with round-robin A records
4. **Use the deployment script**: `deploy.bat` (Windows) or `./deploy.sh` (Linux/Mac)
5. **Monitor with**: `monitor.bat` (Windows) or `./monitor.sh` (Linux/Mac)

## 🔮 Future Enhancements

- **🏠 Property Maintenance Services** - Lawn care, roofing, and general property upkeep
- **📱 Customer Portal** - Online booking and quote tracking system
- **💳 Payment Integration** - Secure online payment processing
- **📊 Service Management** - Advanced scheduling and job management
- **⭐ Review Management** - Customer feedback and testimonial system
- **🌐 Multi-language Support** - Expand to serve diverse communities
- **📈 Analytics Dashboard** - Business intelligence and performance metrics

## 📞 Support

For technical support or customization requests, the website is built with modern standards and is fully maintainable.

---

**Ready to launch ZeroMaintenance.co! 🚀**


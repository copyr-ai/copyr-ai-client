# 🚀 Copyr.ai Client - Frontend Application

A professional Next.js application for copyright clarity platform with beautiful animations and modern UI.

## ✨ Features

- **Next.js 15.4.3** with App Router
- **Tailwind CSS v4** with custom design system  
- **shadcn/ui** component library
- **Framer Motion** animations
- **Responsive design** for all devices
- **Interactive survey/waitlist form**
- **Professional landing page** with MacBook mockup

## 🛠️ Quick Setup

### 1. Extract and Install
```bash
# Extract the archive to your new repository
tar -xzf copyr-ai-client.tar.gz

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your configuration
```

### 3. Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy with these settings:
   - **Framework**: Next.js
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Netlify
1. Push code to GitHub repository
2. Connect repository to Netlify
3. Deploy with these settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`

## 📁 Project Structure

```
copyr-ai-client/
├── 📄 package.json              # Dependencies & scripts
├── 📄 next.config.mjs           # Next.js configuration
├── 📄 jsconfig.json             # Path aliases configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 components.json           # shadcn/ui configuration
├── 📄 .env.example              # Environment template
│
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📄 layout.js         # Root layout
│   │   ├── 📄 page.js           # Home page
│   │   ├── 📄 globals.css       # Global styles
│   │   ├── 📁 about/            # About page
│   │   ├── 📁 features/         # Features page
│   │   └── 📁 api/              # API routes
│   │
│   ├── 📁 components/           # React components
│   │   ├── 📄 HeroSection.jsx   # Main landing section
│   │   ├── 📄 Navbar.jsx        # Navigation
│   │   ├── 📄 Footer.jsx        # Footer
│   │   ├── 📄 SurveyForm.jsx    # Survey form
│   │   └── 📁 ui/               # shadcn/ui components
│   │
│   └── 📁 lib/                  # Utilities
│       └── 📄 utils.js          # Utility functions
│
└── 📁 public/                   # Static assets
    ├── 📄 brand-copyr.ai-*.svg  # Brand logos
    └── 📄 *.svg                 # Icons
```

## 🎨 Key Components

### HeroSection.jsx
- Main landing page with animations
- MacBook mockup with interactive survey
- Responsive cursor effects (desktop only)
- Smooth scroll animations

### SurveyForm.jsx  
- Multi-step waitlist form
- Form validation
- Progress tracking
- API integration ready

### UI Components (shadcn/ui)
- Button, Input, Checkbox, Label
- Radio Group, Select, Textarea
- Card, Progress, Slider
- All properly themed and accessible

## 🔧 Configuration

### Path Aliases (jsconfig.json)
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

### Tailwind Custom Theme
- Custom color palette (`brand-pink`, `brand-purple`)
- Custom gradients and utilities
- Responsive design system
- Dark mode ready

## 🚨 Troubleshooting

### Build Issues
If you encounter import resolution issues:

1. **Check jsconfig.json**: Ensure path aliases are correct
2. **Verify imports**: All UI components should use `@/lib/utils`
3. **Clean build**: Remove `.next` and `node_modules`, reinstall

### Deployment Issues
1. **Package-lock.json**: Ensure it's committed to repository
2. **Environment variables**: Set up properly in deployment platform
3. **Build command**: Use `npm run build` not `npm ci`

## 📞 Support

This is a complete, production-ready Next.js application with:
- ✅ Modern UI/UX design
- ✅ Responsive layout
- ✅ Smooth animations  
- ✅ Form handling
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Deployment ready

Perfect for your new `copyr-ai-client` repository! 🎉

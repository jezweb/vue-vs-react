import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

// Get site configuration from environment variables
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://vue-vs-react.netlify.app'
const siteName = import.meta.env.VITE_SITE_NAME || 'Vue vs React - Interactive Comparison'

// SEO configuration for each page
const seoConfig = {
  '/': {
    title: 'React vs Vue 2024: Interactive Comparison & Decision Guide',
    description: 'Compare React and Vue side-by-side with live code examples, performance metrics, and an interactive decision helper. Find the right framework in minutes.',
    keywords: 'react vs vue, vue vs react, framework comparison, javascript frameworks, react or vue',
    ogImage: null // Removed until we create actual images
  },
  '/comparison': {
    title: 'React vs Vue Code Comparison: Components, State, Lifecycle & More',
    description: 'See the exact same features implemented in both React and Vue. Compare syntax, patterns, and best practices with interactive examples.',
    keywords: 'react vs vue examples, code comparison, syntax differences, react vue components',
    ogImage: null
  },
  '/learn': {
    title: 'Learn React vs Vue: Side-by-Side Tutorials for Beginners',
    description: 'Learn both React and Vue simultaneously with our unique side-by-side approach. Perfect for developers wanting to understand both frameworks.',
    keywords: 'learn react and vue, react vue tutorial, react vs vue for beginners',
    ogImage: null
  },
  '/playground': {
    title: 'React & Vue Live Code Playground - Try Both Frameworks',
    description: 'Write and test React and Vue code side-by-side in your browser. No setup required. Perfect for learning and experimentation.',
    keywords: 'react vue playground, try react vue online, react vue editor',
    ogImage: null
  },
  '/decision-helper': {
    title: 'React or Vue? Interactive Quiz to Choose Your Framework',
    description: 'Answer 5 simple questions about your project and team to get a personalized framework recommendation. Based on real-world factors.',
    keywords: 'should i choose react or vue, framework decision tool, react or vue quiz',
    ogImage: null
  }
}

export function useSEO() {
  const route = useRoute()

  const updateMeta = (path) => {
    const config = seoConfig[path] || seoConfig['/']
    
    // Update title
    document.title = config.title
    
    // Update meta tags
    updateMetaTag('description', config.description)
    updateMetaTag('keywords', config.keywords)
    
    // Update Open Graph tags
    updateMetaTag('og:title', config.title, 'property')
    updateMetaTag('og:description', config.description, 'property')
    updateMetaTag('og:image', config.ogImage || `${siteUrl}/vite.svg`, 'property')
    updateMetaTag('og:url', `${siteUrl}${path}`, 'property')
    updateMetaTag('og:type', 'website', 'property')
    
    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', 'property')
    updateMetaTag('twitter:title', config.title, 'property')
    updateMetaTag('twitter:description', config.description, 'property')
    updateMetaTag('twitter:image', config.ogImage || `${siteUrl}/vite.svg`, 'property')
    
    // Update canonical URL
    updateCanonical(`${siteUrl}${path}`)
    
    // Add structured data
    addStructuredData(path)
  }

  const updateMetaTag = (name, content, attr = 'name') => {
    let element = document.querySelector(`meta[${attr}="${name}"]`)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attr, name)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  const updateCanonical = (url) => {
    let element = document.querySelector('link[rel="canonical"]')
    if (!element) {
      element = document.createElement('link')
      element.setAttribute('rel', 'canonical')
      document.head.appendChild(element)
    }
    element.setAttribute('href', url)
  }

  const addStructuredData = (path) => {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]')
    if (existing) {
      existing.remove()
    }

    let structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl,
      "description": "Interactive comparison of React and Vue frameworks"
    }

    // Add page-specific structured data
    if (path === '/decision-helper') {
      structuredData = {
        ...structuredData,
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "Should I choose React or Vue?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on your project requirements, team experience, and preferences. Our interactive tool helps you make an informed decision based on your specific needs."
          }
        }]
      }
    } else if (path === '/comparison') {
      structuredData = {
        ...structuredData,
        "@type": "TechArticle",
        "headline": "React vs Vue Code Comparison",
        "author": {
          "@type": "Organization",
          "name": "VueVReact"
        }
      }
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData)
    document.head.appendChild(script)
  }

  // Update on mount and route change
  onMounted(() => {
    updateMeta(route.path)
  })

  watch(() => route.path, (newPath) => {
    updateMeta(newPath)
  })

  return {
    updateMeta
  }
}
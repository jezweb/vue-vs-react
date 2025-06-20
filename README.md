# Vue vs React Interactive Comparison

An interactive website that helps developers and non-developers understand the differences between Vue and React through visual comparisons, live code examples, and interactive demos.

## 🚀 Features

- **Interactive Landing Page** - Animated hero section with quick stats comparison
- **Side-by-Side Code Comparisons** - See the same code written in both frameworks
- **Code Playground** - Write and test code in both React and Vue simultaneously
- **Decision Helper Tool** - Interactive questionnaire to help choose the right framework
- **Learning Path** - Structured tutorials for both frameworks
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Responsive Design** - Works on all devices

## 🛠 Tech Stack

- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Icons**: Custom Unicode symbols
- **Deployment**: GitHub Pages (configured)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vue-vs-react.git
cd vue-vs-react

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗 Project Structure

```
vue-vs-react/
├── src/
│   ├── components/
│   │   ├── common/         # Shared components (Navigation, etc.)
│   │   ├── comparisons/    # Code comparison components
│   │   ├── playground/     # Interactive playground components
│   │   └── visualizations/ # Data visualization components
│   ├── views/              # Page components
│   │   ├── Home.vue        # Landing page
│   │   ├── LearnPath.vue   # Learning tutorials
│   │   ├── Playground.vue  # Code playground
│   │   ├── DecisionHelper.vue # Framework selector
│   │   └── Comparison.vue  # Detailed comparisons
│   ├── router/             # Vue Router configuration
│   ├── composables/        # Reusable logic
│   ├── data/              # Static data and examples
│   └── assets/            # Images and static assets
├── public/                # Public assets
└── docs/                  # Documentation and GitHub Pages output
```

## 🎨 Design Features

- **Color Scheme**: React Blue (#61DAFB) vs Vue Green (#42b883)
- **Typography**: Inter for UI, JetBrains Mono for code
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation

## 📝 Content Structure

The comparison covers:
- Component Definition
- State Management
- Lifecycle Methods
- Event Handling
- Conditional Rendering
- List Rendering
- Forms and Input Handling
- Side Effects and Computed Values

## 🚦 Development Status

- ✅ Project setup and configuration
- ✅ Basic navigation and routing
- ✅ Landing page with stats
- ✅ Code comparison component
- ✅ Decision helper tool
- ✅ Basic playground layout
- ⏳ Monaco editor integration
- ⏳ Interactive demos
- ⏳ Full content migration
- ⏳ GitHub Pages deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or in your own projects.

## 🙏 Acknowledgments

- React documentation and community
- Vue documentation and community
- All the developers who contribute to both frameworks
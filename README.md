# LISA vigIA - Insurance Claims Portal Mockup

> A professional mockup of an insurance claims portal where third parties can report accidents and submit documentation for claims processing.

## 👀 View the Live Demo

**See the mockup in action:** https://fjpino84.github.io/terceros/

Just click the link above — no installation needed!

## 📋 Features

- **Client Portal**: User-friendly interface for submitting claims
  - Initial data form (DNI, license plates)
  - Document upload (ID, license, quote, coverage, police report)
  - Result page with next steps
  
- **LISA Console**: Internal AI analysis dashboard
  - Real-time document validation with OCR simulation
  - Business rules verification
  - Fraud detection alerts
  - Sequential rule execution with animations

- **Two Scenarios**:
  - ✅ **Approved**: All documents valid, claim accepted
  - ⏳ **Pending Review**: Documents require attention, shows orange/yellow warning state

## 🛠 Tech Stack

- **React 18** with Vite
- **CSS3 Native** (no external dependencies)
- **Context API** for state management
- **localStorage** for session persistence
- Responsive design with rem-based sizing
- Custom component library (no UI framework)

## 🚀 Getting Started (Local Development)

```bash
# Clone the repository
git clone https://github.com/fjpino84/terceros.git
cd terceros/lisa-vigia

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open http://localhost:5183/ in your browser.

## 📦 Build for Production

```bash
npm run build
```

The optimized app will be in the `dist/` folder.

## 📸 Mockup Highlights

### Client Experience
- Clean, institutional design matching real insurance company websites
- Step-by-step progress indicator (3 steps)
- Clear error messaging and validation
- Professional footer with company branding

### LISA Analysis Console
- Document analysis with visual progress
- Automated business rule validation:
  - License plate matching
  - Temporal validity (±3 days tolerance)
  - Ownership verification
  - Sworn statement validation
  - Document integrity checks
- Fraud detection pipeline
- Color-coded results (green for pass, orange for pending, red for issues)

## 📝 License

This is a mockup for demonstration purposes.

---

Built with ❤️ for insurance claims processing innovation.

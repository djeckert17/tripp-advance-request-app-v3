# TRIPP+ Enterprise Fund - Advance Request Process

An interactive web application that visualizes the State Department advance request process for the TRIPP+ Enterprise Fund.

## Features

- **Interactive Timeline**: 4-phase process visualization from planning through funds receipt
- **Form Structure Guide**: Visual breakdown of the 5-column State Department form
- **Budget Mapping**: $850,000 initial draw request mapped to 7 categories
- **Interactive Checklist**: Pre-submission, submission, and post-submission requirements
- **Common Pitfalls**: Learn from common mistakes and how to avoid them
- **Example Scenario**: Real-world first advance request walkthrough
- **Resources**: Key documents, contacts, and deadlines

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone or download the project
cd tripp-advance-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Live Demo

**Production URL**: [https://tripp-advance-request-app-v3.vercel.app](https://tripp-advance-request-app-v3.vercel.app)

The application is deployed on Vercel with automatic deployments enabled via GitHub integration.

## Deployment to Vercel

This project is connected to Vercel with automatic deployments:
- **GitHub Repository**: [https://github.com/djeckert17/tripp-advance-request-app-v3](https://github.com/djeckert17/tripp-advance-request-app-v3)
- **Production URL**: [https://tripp-advance-request-app-v3.vercel.app](https://tripp-advance-request-app-v3.vercel.app)
- Every push to `main` triggers an automatic production deployment
- Pull requests receive preview deployments automatically

### Manual Deployment Options

#### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

#### Option 2: Via GitHub Integration

1. Push changes to the GitHub repository
2. Vercel automatically detects and deploys changes
3. View deployment status at [vercel.com](https://vercel.com)

#### Option 3: Manual Upload

1. Run `npm run build`
2. Upload the `dist` folder to Vercel's drag-and-drop interface

## Project Structure

```
tripp-advance-app/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment config
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Main application component (self-contained)
```

## Key Information

### Advance Request Timeline

1. **Planning & Preparation** (T-20 to T-12 days)
2. **Form Completion & Submission** (T-10 days deadline)
3. **State Department Review** (T-9 to T-1 days)
4. **Funds Receipt & Monitoring** (Day T to T+90)

### Critical Requirements

- **Coverage Period**: Maximum 90 days
- **Lead Time**: Submit 10 business days before funds needed
- **Admin Cap**: 5% of total grant ($10M of $200M)
- **Required Documents**: Excel form, budget narrative (2-3 pages), invoices >$50K

### Key Contacts

- Grants Officer's Representative (GOR)
- EUR/ACE Program Officer
- MD/CIO: Daniel Eckert
- Email: EUR-ACE-FAM@state.gov

## Customization

The app is built as a single React component (`App.jsx`) with embedded CSS for easy customization:

- **Colors**: Modify CSS variables in the `styles` constant
- **Data**: Update the data arrays (`phases`, `budgetMapping`, `pitfalls`, etc.)
- **Content**: All text content is in the component for easy editing

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS Variables** - Theming
- **Google Fonts** - DM Sans & Space Mono

## Document References

- Grant Agreement Part 1: Program Description
- Grant Agreement Part 2: General Provisions
- Annex 2: Periodic Advance Request Form (Excel)
- TRIPP Implementation Framework (TIF)

---

**Version**: 1.0  
**Prepared**: January 30, 2026  
**Next Review**: After first advance request processed (Day 40-45)

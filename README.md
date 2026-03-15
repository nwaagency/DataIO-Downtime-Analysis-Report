# **Southern Composite Engineering (SCE) \- Corporate Website**

## **Overview**

The Southern Composite Engineering (SCE) website is a modern, high-performance Single Page Application (SPA) designed to showcase the company's precision manufacturing, CNC machining, and product development capabilities.

**Problem Solved:** Traditional engineering websites often suffer from static, unengaging layouts. This project solves that by providing a highly interactive, media-rich portfolio experience that seamlessly presents complex engineering services to potential clients, while maintaining fast load times and responsive design.

**Target Users:** Prospective B2B clients, product developers, and industrial partners seeking precision manufacturing, prototyping, and automated system development services.

**High-Level Architecture:** The project is a strictly frontend, serverless architecture. It relies on a static React build utilizing client-side routing. Dynamic backend functionality (specifically, the contact form) is offloaded to a third-party serverless API (Web3Forms), eliminating the need for a dedicated backend service or database.

## **Tech Stack**

* **Frontend Framework:** React 18  
* **Routing:** React Router DOM v6  
* **Language:** TypeScript  
* **Styling:** Tailwind CSS (v3) with Custom CSS Variables & PostCSS  
* **UI Components:** shadcn/ui (Built on Radix UI primitives)  
* **Animations:** Framer Motion, GSAP  
* **State/Data Management:** React Query (@tanstack/react-query)  
* **Forms & Validation:** React Hook Form, Zod  
* **Spam Protection:** hCaptcha (@hcaptcha/react-hcaptcha)  
* **Email Service:** Web3Forms API  
* **Build Tool:** Vite (with @vitejs/plugin-react-swc for ultra-fast compilation)  
* **Hosting / Deployment (Inferable):** Any static site host (Vercel, Netlify, AWS S3, Cloudflare Pages)

## **Features**

* **Media-Rich Interactive Hero Sections:** \- *Technical Implementation:* Uses dynamic component swapping (Hero\_SS.tsx, Hero\_4pics.tsx, etc.) with framer-motion for Ken Burns effects, coordinated slideshows, and smooth typography reveals. HTML5 \<video\> elements are extensively used for background textures.  
* **Scroll-Triggered Animations:** \- *Technical Implementation:* Utilizes a custom use-scroll-animation.tsx hook wrapping framer-motion's useInView. Respects system accessibility preferences by detecting useReducedMotion().  
* **Serverless Contact Form:** \- *Technical Implementation:* The Contact.tsx component submits multipart form data via the native fetch API directly to Web3Forms. It intercepts submissions to validate an injected hCaptcha token before proceeding, providing localized error handling via shadcn/ui toast notifications.  
* **Accessible, Modular Design System:** \- *Technical Implementation:* The UI is built using shadcn/ui components located in src/components/ui. It leverages a centralized Tailwind configuration and utility functions (clsx \+ tailwind-merge) to allow dynamic, conflict-free class composition.

## **Architecture**

### **Project Structure**

SCEngineering\_Website\_Draft-master/  
├── public/                 \# Static assets served at the root (favicon, robots.txt)  
├── src/  
│   ├── assets/             \# Media assets (images, videos, branding)  
│   ├── components/         \# Reusable feature blocks and UI components  
│   │   └── ui/             \# shadcn/ui foundational components (buttons, dialogs, etc.)  
│   ├── hooks/              \# Custom React hooks (use-mobile, use-toast, use-scroll-animation)  
│   ├── lib/                \# Utility functions (e.g., Tailwind class merger)  
│   ├── pages/              \# High-level route views (Index, About, Contact, Services, Projects)  
│   ├── App.tsx             \# Main application shell, routing, and provider setup  
│   ├── App.css/index.css   \# Global styles and Tailwind root configurations  
│   ├── main.tsx            \# React entry point & DOM attachment  
│   └── vite-env.d.ts       \# Vite TypeScript type declarations  
├── .gitignore  
├── components.json         \# shadcn/ui configuration file  
├── eslint.config.js        \# ESLint flat config setup  
├── package.json            \# Dependency manifest and npm scripts  
├── postcss.config.js       \# PostCSS configuration for Tailwind  
├── tailwind.config.ts      \# Tailwind CSS configuration and custom theme tokens  
└── vite.config.ts          \# Vite bundler and dev server configuration

### **Application Flow**

1. **Initialization:** The browser loads index.html, which injects the bundled main.tsx.  
2. **Providers & Routing:** main.tsx renders App.tsx, which wraps the application in QueryClientProvider (React Query), TooltipProvider, Toaster contexts, and BrowserRouter.  
3. **Route Resolution:** react-router-dom resolves the URL (e.g., /services) and renders the corresponding Page component from src/pages/.  
4. **Data Flow:** As a static site, data (like project lists and services) is currently hardcoded within the components (Projects.tsx, Services.tsx). The only external data mutation occurs in Contact.tsx via a POST request to Web3Forms.

## **Installation**

### **Prerequisites**

* **Node.js**: v18.0.0 or higher  
* **npm** (or yarn/pnpm)

### **Setup**

1. **Clone the repository:**  
   git clone \<repository-url\>  
   cd SCEngineering\_Website\_Draft-master

2. **Install dependencies:**  
   npm install

3. **Configure environment variables:**  
   Create a .env file in the root directory:  
   touch .env

   Add the following variables to the .env file:  
   VITE\_WEB3FORMS\_KEY=your\_web3forms\_access\_key

4. **Run the development server:**  
   npm run dev

   The application will be available at http://localhost:8080.

## **Available Scripts**

Defined in package.json:

* npm run dev: Starts the Vite development server with Hot Module Replacement (HMR).  
* npm run build: Compiles the TypeScript code and bundles the application for production using Vite.  
* npm run build:dev: Creates a build using the development mode (useful for debugging build-specific issues with source maps).  
* npm run lint: Runs ESLint across the codebase to catch syntax and style issues.  
* npm run preview: Bootstraps a local static web server to preview the production build generated in the dist/ directory.

## **Build & Deployment**

**Production Build:**

To prepare the application for deployment, run:

npm run build

This generates a highly optimized, minified bundle in the dist/ folder. Vite uses Rollup under the hood, ensuring tree-shaking and asset optimization.

**Deployment:**

The contents of the dist/ directory can be deployed to any static hosting provider.

* Ensure that the hosting provider is configured to redirect all 404 requests to index.html (Client-Side Routing fallback) since React Router handles navigation natively.

## **Security Notes**

* **Authentication:** This is a public-facing website; there are no user authentication mechanisms or protected routes.  
* **Sensitive Configuration:** The VITE\_WEB3FORMS\_KEY is exposed to the client bundle (prefixed with VITE\_). This is generally acceptable for Web3Forms access keys designed for public web usage, but ensure domain restrictions are enforced within the Web3Forms dashboard to prevent key abuse.  
* **Spam Mitigation:** Form submissions are guarded by hCaptcha on the client side, ensuring bots cannot abuse the Web3Forms endpoint via automated scripts.

## **Contributing**

* **Code Style:** The project uses ESLint with @typescript-eslint/recommended and eslint-plugin-react-hooks. Adhere to the established styles. Note that @typescript-eslint/no-unused-vars is currently turned "off" in the ESLint config; it is recommended to clean up unused variables before submitting PRs.  
* **Component Addition:** When adding new UI components, prefer generating them via the shadcn/ui CLI to maintain aesthetic and accessible consistency.

## **Improvements & Recommendations**

1. **Performance Optimizations:**  
   * **Lazy Loading Routes:** Implement React.lazy() and \<Suspense\> in App.tsx for route-level code splitting. Currently, all pages are bundled into the initial load.  
   * **Video Optimization:** The hero videos (DSC\_2714.mov/.mp4) appear to be large local assets. Consider hosting these on a CDN (like AWS S3 or Mux) and streaming them via HLS, or at least heavily compressing them for web to improve First Contentful Paint (FCP).  
2. **Code Structure Improvements:**  
   * **Data Abstraction:** Hardcoded data arrays (e.g., projectReels in Index.tsx, projects in Projects.tsx, and mediaSlides in the Hero components) should be extracted into separate configuration files (e.g., src/data/projects.ts) to separate logic from content.  
3. **Scalability Enhancements:**  
   * **Headless CMS Integration:** If the portfolio or services change frequently, consider integrating a Headless CMS (like Sanity, Contentful, or Strapi) and utilizing the already installed @tanstack/react-query to fetch data dynamically at runtime.  
4. **SEO & Metadata:**  
   * While index.html has basic meta tags, implement react-helmet-async to dynamically inject \<title\>, \<meta\>, and Open Graph tags based on the current React Router path to improve SEO across individual pages.
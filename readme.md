SC Engineering Website - Project Documentation

1. Project Overview

This project is the official corporate website for Southern Composite Engineering (SCE), a Cape Town-based engineering company specializing in product design, prototyping, and precision manufacturing (CNC).

The website is a modern, responsive static site designed to showcase the company's services, project portfolio, and history, while providing a seamless contact mechanism for prospective clients. It features rich multimedia integration (videos/images) and smooth scroll-based animations to create a premium engineering aesthetic.

2. Tech Stack

Frontend

HTML (layout + component partials)

CSS (custom design system)

Vanilla JavaScript (UI interactions & API integrations)

Infrastructure

Netlify (hosting + CDN)

npm (build orchestration)

3. Project Structure

The codebase follows a modular organization optimized for a vanilla web stack:

website-test-main/
├── public/                 # Static assets (favicon, robots.txt, media)
├── src/
│   ├── css/                # Custom design system and styling
│   │   ├── variables.css   # Core CSS variables (colors, spacing, fonts)
│   │   ├── layout.css      # Grid and structural styles
│   │   └── components.css  # Reusable UI component styles
│   ├── js/                 # Vanilla JavaScript modules
│   │   ├── main.js         # Entry point and global logic
│   │   ├── animations.js   # IntersectionObserver and scroll logic
│   │   └── form.js         # Web3Forms submission handling
│   ├── index.html          # Landing page
│   ├── services.html       # Services detail page
│   ├── projects.html       # Project portfolio page
│   ├── about.html          # Company history page
│   └── contact.html        # Contact form and location page
├── netlify.toml            # Netlify deployment configuration
└── package.json            # npm scripts for local dev and build orchestration


4. Key Pages & Routing

Routing is handled natively by the browser navigating between static .html files.

/index.html: The landing page. Features a dynamic Hero video/slideshow section, a brief "About" overview, a preview of services and projects, and a Google Maps embed.

/services.html: Details the core offerings (CNC Manufacturing, Product Development). Uses vanilla JS to switch between specific engineering disciplines with embedded video demonstrations.

/projects.html: A portfolio showcase. Renders high-quality video/image cards detailing past builds (e.g., "The Gibbon", "SkiSpot") with custom JS fullscreen video capabilities.

/about.html: Company history and team introduction.

/contact.html: Contains contact information, a Google Maps embed, and a functional Web3Forms contact form.

5. Core Features & Architecture

UI & Custom Design System (CSS)

The project utilizes a custom CSS design system rather than relying on heavy utility frameworks.

Theme Variables: Core colors (primary, background, foreground) are defined using CSS custom properties (var(--primary)) in variables.css for easy maintenance.

Design System: The site uses a "Blueprint" engineering aesthetic, characterized by a dark blue/slate palette, CSS grid background patterns, and glowing accent lines.

Animations (Vanilla JS + CSS)

Animations are built natively to maximize performance:

Scroll Animations: Handled via IntersectionObserver in animations.js. Elements receive a .visible class when they enter the viewport, triggering CSS transitions.

Floating Elements: Subtle parallax and floating blueprint lines are achieved using lightweight requestAnimationFrame loops and CSS transform.

Contact Form (Web3Forms)

The contact form in contact.html is fully functional without a backend server.

Provider: Posts directly to the Web3Forms API using the native fetch API in form.js.

Security: Includes hCaptcha to prevent spam submissions.

6. Available Scripts

Run these commands in your terminal using npm:

npm run dev - Starts a local development server (e.g., using live-server or http-server).

npm run build - Orchestrates the build process (minifying CSS/JS, copying assets to the dist/ folder).

npm run preview - Boots up a local server to preview the compiled dist/ folder.

7. Netlify Deployment

The project relies on Netlify for continuous deployment and global CDN hosting.
Configuration is managed via the netlify.toml file at the project root:

[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200


Netlify automatically triggers a build and deploys the dist/ folder whenever changes are pushed to the main repository branch.

8. Comprehensive Migration Guide: React to Vanilla Stack

This section provides a step-by-step roadmap to physically convert the existing React/Tailwind SPA into the new Vanilla HTML/CSS/JS architecture.

Step 1: Environment Cleanup & Restructuring

First, strip out the React-specific dependencies and configuration files.

Remove React Dependencies:
Run the following command to uninstall React, Framer Motion, Tailwind, and Shadcn UI tools:

npm uninstall react react-dom react-router-dom framer-motion tailwindcss postcss autoprefixer @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react


Delete React Config Files:
Remove the following files from your root directory:

tsconfig.json, tsconfig.app.json, tsconfig.node.json

tailwind.config.ts, postcss.config.js

components.json, eslint.config.js

Reorganize the src folder:
Delete the React directories (src/components/, src/hooks/, src/lib/, src/pages/, src/App.tsx, src/main.tsx).
Create the new folder structure:

mkdir -p src/css src/js


Step 2: HTML Conversion (Routing & Layout)

Since we are moving away from react-router-dom, each page must become a distinct .html file.

Create Base HTML Pages:
Create index.html, services.html, projects.html, about.html, and contact.html inside the src/ directory.

Translate JSX to HTML:
Open your old React components (e.g., Index.tsx, Hero.tsx) and copy the JSX output into your new index.html.

Crucial Fixes: * Change all className="..." to class="...".

Change all self-closing tags like <img /> and <input /> to valid HTML5 (or leave them, but remove trailing slashes for standard HTML).

Replace <Link to="/about"> with <a href="/about.html">.

Add Global Partials:
Since you don't have a React <Navigation /> or <Footer /> component anymore, you must copy the navigation and footer HTML into the top and bottom of every HTML file.

Step 3: Translating Tailwind to Custom CSS

This is the most labor-intensive step. You will extract the Tailwind styling into semantic CSS classes.

Set up variables.css:
Take the HSL colors from your old index.css and put them into :root in src/css/variables.css.

:root {
  --primary: hsl(210 80% 25%);
  --background: hsl(0 0% 98%);
  --foreground: hsl(210 20% 20%);
  /* ... other variables ... */
}


Create layout.css:
Translate structural Tailwind classes. For example, instead of <div class="container mx-auto px-4 max-w-6xl">, create a utility class:

.container {
  width: 100%;
  max-width: 1152px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}


Replace Inline Classes:
Go through your HTML files. Where you see <div class="flex flex-col items-center justify-center space-y-4">, replace it with semantic classes like <div class="hero-content"> and define .hero-content in components.css.

Step 4: Rebuilding Interactivity (Vanilla JS)

React hooks (useState, useEffect) must be translated to vanilla DOM manipulation. Create a src/js/main.js file and link it at the bottom of your HTML files: <script src="/js/main.js"></script>.

Mobile Navigation Toggle (Replacing useState):

// src/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu-panel');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        mobileMenu.classList.remove('open');
        // handle icon swap logic here
      } else {
        mobileMenu.classList.add('open');
      }
    });
  }
});


Scroll Animations (Replacing Framer Motion):
Create src/js/animations.js. Use IntersectionObserver to replicate the fade-in effects.

// src/js/animations.js
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target); // Run once
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
  observer.observe(el);
});


Note: Ensure you define .scroll-animate (opacity: 0) and .animate-fade-in (opacity: 1, transition) in your CSS.

Step 5: Handling the Contact Form

Move the Web3Forms submission logic from Contact.tsx to src/js/form.js.

// src/js/form.js
const contactForm = document.getElementById('contact-form');
const WEB3FORMS_KEY = "ffc72496-1720-4340-8bfe-c03ed308be1e"; // Your key

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    
    const formData = new FormData(contactForm);
    formData.append("access_key", WEB3FORMS_KEY);
    
    try {
      const response = await fetch("[https://api.web3forms.com/submit](https://api.web3forms.com/submit)", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Error sending message.");
      }
    } catch (error) {
      alert("Network error.");
    } finally {
      submitBtn.textContent = 'Send Message';
    }
  });
}


Step 6: Build Process & Netlify Setup

To prepare the site for production, we need a simple build step to copy files into a dist/ directory.

Setup Vite as a Static Server (Optional but recommended for speed):
Vite is actually excellent at serving and building Vanilla HTML projects without React. You can keep Vite installed. Update vite.config.ts:

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src", // Tell Vite the source is in src/
  build: {
    outDir: "../dist", // Build to the root dist/ folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        services: resolve(__dirname, 'src/services.html'),
        projects: resolve(__dirname, 'src/projects.html'),
        about: resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html')
      }
    }
  }
});


Update package.json Scripts:

"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}


Configure netlify.toml:
Create this file in the root of your project to tell Netlify how to deploy your site.

[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200


Deploy: Push your updated code to GitHub. Netlify will automatically detect the netlify.toml file, run npm run build, and publish the contents of the dist/ directory to the global CDN.
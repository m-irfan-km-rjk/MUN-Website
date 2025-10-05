TKM College of Engineering MUN 2025 Website
This is the official website for the TKM College of Engineering's Model United Nations (MUN) conference for 2025. The central theme for this year's event is the International Cricket Council (ICC).

The website is designed with a modern, minimalist, and professional aesthetic, inspired by the clean, animation-rich design of commure.com. It is a fully responsive single-page application.

Tech Stack
This project is built with a modern web development stack:

Framework: Next.js (v15+)

Library: React

Styling: Tailwind CSS (v4)

Animations: Framer Motion

Background Effects: React TS-Particles

Icons: Lucide React

Getting Started
To run the project locally, follow these steps:

Clone the repository:

git clone <your-repository-url>

Navigate into the project directory:

cd MUN-Website

Install dependencies:

npm install

Run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.

Project Structure
The project follows the standard Next.js app directory structure:

src/app/page.js: The main entry point for the homepage, which assembles all the sections.

src/app/layout.js: The root layout for the entire application. It sets up the global font and the fluid background animation.

src/app/globals.css: Contains the Tailwind CSS directives and the custom theme configuration (colors, fonts).

src/components/: Contains all the reusable React components used to build the page (e.g., Navbar.jsx, HeroSection.jsx, CommitteesSection.jsx).

Key Features
Fluid Particle Animation: A subtle, animated background that provides a dynamic and high-end feel.

Scroll-Triggered Animations: Content sections gracefully fade or slide into view as the user scrolls, powered by Framer Motion.

Responsive Design: The layout is fully responsive and optimized for a seamless experience on all devices, from mobile phones to desktops.

Custom Theming: Utilizes a custom color palette defined in globals.css to maintain a consistent and professional brand identit
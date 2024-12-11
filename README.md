# Pragati Frontend 2025

This is the frontend repository for **Pragati 2025**, the annual fest of the Amrita School of Business (ASB). The application is built using [Next.js](https://nextjs.org) and designed to provide a seamless user experience for event attendees and organizers.

## Project Overview

**Pragati 2025 - Frontend** aims to:

- Display event schedules, participant details, and venue information.
- Offer a responsive and intuitive user interface.
- Provide real-time updates for the event.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Commit Guidelines](#commit-guidelines)
5. [Technologies Used](#technologies-used)
6. [Using `next/font/local` for Custom Fonts](#using-nextfontlocal-for-custom-fonts)
7. [Learn More](#learn-more)
8. [Deploy on Vercel](#deploy-on-vercel)
9. [Contributing](#contributing)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a font family by Vercel.

---

## Installation

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/TharunKumarrA/Pragati_Frontend_2025.git
   cd Pragati_Frontend_2025
   ```

2. **Install dependencies:**
   
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Usage

- **Development Mode:**
  
  ```bash
  npm run dev
  ```
  
  The app will auto-update as you make changes.

- **Production Build:**
  
  ```bash
  npm run build
  ```
  
  To run the production build:
  
  ```bash
  npm start
  ```

---

## Commit Guidelines

### Frontend Team Note

- **Commitlint** has been added to `package.json` to enforce proper commit message standards.

- After pulling from the `main` branch, make sure to install it and its dependencies:
  
  ```bash
  npm install
  ```

### How to Commit Changes

1. **Stage your files**:
   
   ```bash
   git add <files>
   ```

2. **Use `npx cz` instead of `git commit`**:
   
   ```bash
   npx cz
   ```
   
   This will open a guided interface to help you write commit messages that follow the required standards.

---

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ESLint**: Tool for identifying and fixing code issues.
- **PostCSS**: CSS processing tool.
- **Node.js**: JavaScript runtime environment.

---

## Using `next/font/local` for Custom Fonts

When using `next/font/local` for custom fonts, **font files must be placed inside the `src` directory**. The `next/font/local` function resolves paths relative to the file that imports the font. Placing fonts in the `public` directory will not work because the `public` folder is meant for assets served via HTTP (e.g., images in `<img src="/image.png">`).

### Steps to Add Custom Fonts

1. **Create a Fonts Directory**:

   Add a `fonts` folder inside `src`, e.g., `src/fonts`.

   ```plaintext
   src/
     └── fonts/
         ├── ChicAvenue.woff
         └── Poppins.woff
   ```

2. **Use `next/font/local`** in Your Component:

   Import the font in your component using `next/font/local`.


### Important Notes

- **Relative Paths**: The paths in `next/font/local` should be relative to the file importing the font.
- **Avoid Public Directory**: Do not place font files in the `public` folder; `next/font/local` only works with files inside `src`.
- **Automatic Optimization**: Fonts imported with `next/font/local` are automatically optimized by Next.js.

---

## Learn More

To learn more about Next.js, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Feedback and contributions are welcome!

---

## Deploy on Vercel

The easiest way to deploy this Next.js app is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) created by the Next.js team.

Refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

---

## Contributing

To contribute to this project:

1. **Pull the latest changes from the `main` branch**:
   
   ```bash
   git pull origin main
   ```

2. **Create a new branch for your feature or fix**:
   
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and follow the [commit guidelines](#commit-guidelines)** when committing:
   
   ```bash
   git add <files>
   npm install --save-dev commitizen cz-conventional-changelog  # Install Commitizen (if not already installed)
   npx cz
   ```

4. **Push your branch** to the remote repository:
   
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** from your branch to the `main` branch.

### Note:

Since this is a **private repository**, only collaborators have access to contribute. Please ensure your pull request follows the project's coding standards and commit message guidelines.

---

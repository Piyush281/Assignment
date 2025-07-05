This React application displays a list of repositories and allows users to view detailed information for each one. The main feature is available at the /repository route, where all repositories are listed. When a user clicks on a repository item, detailed information is shown.

## Features

- List all the repository on the `/repositories` path
- Click on the repository to view its detailed information
- Modern UI with fast routing and development
- Unit test written in `Vitest`

## Tech Stack

- React
- Vite
- React Router
- Vitest (in-built with Vite)

## Set up project locally
### 1. Clone the repository
      $ git clone https://github.com/Piyush281/Assignment.git
      $ cd Assignment

### 2. Install Dependency
      $ npm install

### 3. Start the app
      $ npm run dev

### 4. Run tests
      $ npm test


## Folder Structure

``` text
/src
├── /components # Reusable UI components
│ ├── fileName.tsx # Component logic
│ ├── fileName.css # Component-specific styles
│ └── fileName.test.tsx # Unit tests for the component
│
├── /pages # Route-based components (views)
│ ├── fileName.tsx # Page component logic
│ ├── fileName.css # Page-specific styles
│ └── fileName.test.tsx # Unit tests for the page component
│
├── /styles # Global styles
│ └── index.css # Main stylesheet imported globally
│
├── /types # Shared TypeScript interfaces/types
│
├── App.tsx # Root component
└── main.tsx # Entry point
```
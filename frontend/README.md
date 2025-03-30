# LeapGPT Frontend

This is the frontend for LeapGPT, a RAG/LLM Chatbot trained on data from consulting firms, focusing on white papers containing information about consumer markets, future billion-dollar markets, and product market fit ideas.

## Getting Started

Follow these instructions to set up and run the frontend application.

### Prerequisites

- Node.js (14.x or later)
- npm or yarn
- Backend API running (see backend README for instructions)

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- Modern UI built with Next.js and Tailwind CSS
- Real-time chat interface
- Markdown support for bot responses
- Responsive design for mobile and desktop

## Backend Integration

The frontend communicates with the backend API running on http://localhost:8000. Make sure the backend server is running before using the chat interface.

## Running in Production

To build and run the application in production:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Project Structure

- `src/app` - Next.js app router components
- `src/components` - Reusable React components
- `public` - Static assets

## Technologies Used

- Next.js - React framework
- Tailwind CSS - Utility-first CSS framework
- Axios - HTTP client
- React Markdown - Markdown rendering 
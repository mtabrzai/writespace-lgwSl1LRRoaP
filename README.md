# Writespace

A clean, distraction-free writing environment built with React, TypeScript, and Vite.

## Features

- Distraction-free writing interface
- Responsive design for all devices
- Markdown support
- Secure authentication
- Document organization with folders and tags
- Export options (Markdown, PDF, Word)
- Fast performance

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/writespace.git
cd writespace
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Running Tests

```bash
npm test
# or
yarn test
```

### Previewing the Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
writespace/
├── public/               # Static assets
├── src/
│   ├── api/              # API client and mocks
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   ├── routes/           # Routing configuration
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── .env.example          # Environment variables template
├── package.json          # Project dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_URL` | Base URL for API requests | `https://api.writespace.com` |
| `VITE_API_KEY` | API key for authentication | `your-api-key` |

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start the development server |
| `build` | Build for production |
| `preview` | Preview the production build |
| `test` | Run tests |
| `test:ui` | Run tests with UI |
| `coverage` | Run tests with coverage |
| `lint` | Run ESLint |

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
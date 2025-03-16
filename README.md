# manual-test
Test task for Manual [https://www.manual.co](https://www.manual.co)

## Prerequisites

- Node.js (v20.x or later)
- npm (v10.x or later)

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/tormozz48/manual-test.git

# Navigate to the project directory
cd manual-test

# Install dependencies
npm install
```

## Running the Application

The application can be run in different modes:

```bash
# Development mode
npm run start

# Watch mode (automatically restarts on file changes)
npm run start:dev

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

By default, the application will start on port 3001. You can access it at [http://localhost:3001](http://localhost:3001).

## Database Integration

This project uses SQLite with TypeORM for database operations:

- **SQLite**: A lightweight, file-based database that requires no separate server
- **TypeORM**: An ORM that can run in Node.js and supports TypeScript

The database file is stored in the `data/` directory as `database.sqlite`. The application is configured to automatically create the database schema based on the entity definitions.

## Running Tests

This project includes both unit tests and end-to-end tests:

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run unit tests with coverage report
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

## Code Quality

Maintain code quality with linting and formatting:

```bash
# Lint the code
npm run lint

# Format the code
npm run format

# manual-test
Test task for Manual [https://www.manual.co](https://www.manual.co)

## Used tools

Project was implemented with Windsurf IDE and Claude 3.7 Assistant.

## Task

The task is defined in the [task](task/task.md) file.

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

### API Documentation

The API documentation is available at [http://localhost:3001/api/docs](http://localhost:3001/api/docs).

## Database Schema

The database schema is defined in the [database schema](database_schema/db_schema.puml) file.
Markdown schema is defined in the [database schema](database_schema/db_schema.md) file.

## Database Integration

This project uses SQLite with TypeORM for database operations:

- **SQLite**: A lightweight, file-based database that requires no separate server
- **TypeORM**: An ORM that can run in Node.js and supports TypeScript

The database file is stored in the `data/` directory as `database.sqlite`. The application is configured to automatically create the database schema based on the entity definitions.

## Running Tests

This project includes end-to-end tests:

```bash
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

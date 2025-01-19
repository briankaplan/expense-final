# Brian's Expenses

A modern expense tracking application built with React, TypeScript, and Cloudflare Workers.

## Features

- Modern dark theme UI inspired by Spotify
- Expense tracking with filtering and sorting
- Receipt upload and management
- CSV import support
- D1 Database for data storage
- R2 bucket for receipt storage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create the local database:
```bash
wrangler d1 execute expenses --local --file=migrations/0000_initial.sql
```

3. Import test data (optional):
```bash
wrangler d1 execute expenses --local --file=scripts/import_all.sql
```

## Development

Start the local development server:
```bash
npm run start:local
```

The application will be available at http://localhost:8787

## Deployment

1. Create the production database:
```bash
wrangler d1 execute expenses --file=migrations/0000_initial.sql
```

2. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

## API Endpoints

- `GET /api/expenses` - List expenses with filtering
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `POST /api/expenses/:id/receipt` - Upload a receipt
- `POST /api/expenses/:id/match` - Match a receipt to an expense

## Environment Variables

The following environment variables are required:

- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

## License

MIT 
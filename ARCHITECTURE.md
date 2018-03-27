
# Architecture

## Files & Folders

- `isomorphic/` - stores all code used by either `server/` or `client/`
- `server/` - stores all server related code
  - `utils/` - utilities for the server
  - `lib/` - logic and helpers that do not depend on a database
  - `psql/` - setting up and migrating the database
  - `model/` - database modeling and business logic
  - `controllers/` - routing logic
  - `api/` - API routes
  - `routes/` - non-API routes
- `client/` - all client-side app code
- `tests/` - tests that span both the server and the client
  - `monitors/` - API and Puppeteer smoke tests
  - `automation/` - Selenium tests

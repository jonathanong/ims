
# Architecture

## Technical Stack

Database:

- PostgreSQL
- Redis (not implemented)

Backend:

- Koa
- Pug

Frontend:

- React
- Redux

Testing:

- Unit - Jest
- Acceptance - Selenium & Puppeteer (via @dollarshaveclub/e2e)
- Monitors - Puppeteer (via @dollarshaveclub/monitor)

## Files & Folders

- `isomorphic/` - stores all code used by either `server/` or `client/`
- `server/` - stores all server related code
  - `utils/` - utilities that has no business logic
  - `lib/` - logic and helpers that do not depend on a database, but do affect business logic
  - `psql/` - setting up and migrating the database
  - `model/` - database modeling and business logic
  - `app/` - bootstrap the Koa app
  - `controllers/` - routing logic
  - `api/` - API routes
  - `routes/` - non-API routes
- `client/` - all client-side app code
  - `ui/` - all visual UI components
  - `components/` - all non-connected components
  - `stories/` - stories for all non-connected components for Storybook
  - `api-sdk/` - SDK for the API
  - `store/` - redux store
    - `<domain>` - the redux store is stored by domain
      - `actions`
      - `reducer`
      - `index.js` - the action dispatcher for this domain. These are the only functions connected components should be calling.
  - `routes/` - connected components that are served by a route
- `public/` - all static assets served publicly
- `tests/` - tests that span both the server and the client
  - `monitors/` - API and Puppeteer smoke tests
  - `automation/` - Selenium tests

## Modularizing

Currently, this app is built as a monorepo. For small projects, this is sufficient
and makes adding features easy. However, this becomes difficult to scale.
Here's a plan for modularization, which depends on your app:

- `utils` / `lib` - a module for all `utils` and/or `server/lib`
- `server/model/` - a module for all app business logic
- `storybook` - a module/app for the storybook
  - `.storybook`
  - `client/ui/`
  - `client/compoonents/`
  - `client/stories/`
- `api-sdk/` - an isomorphic module for working with your API
- `client/store` - a module for your redux store
- `tests/monitors/` - a module for your monitors and to run them
- `tests/automation/` - a module for your automation tests

## Ownership

Ownership of parts of the app and modularized can be split by discipline:

- Server - Backend
- Storybook - Frontend UI
- Redux store - Frontend App
- API SDK - Backend and Frontend App
- Tests - QA as well as Frontend and Backend

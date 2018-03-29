# IMS – Image Management System

[![CircleCI](https://circleci.com/gh/funraiseme/ims/tree/master.svg?style=svg&circle-token=e671a5694822728e67dc35852856d4705d6195c6)](https://circleci.com/gh/funraiseme/ims/tree/master)

IMS is an image management system designed for managing your static assets. It's not designed to be a full-fledged CMS or DAM.

## Features

- Tagging
- CDN Support
  - Imgix - for resizing, compressing, and manipulating your image
  - AWS CloudFront
  - CloudFlare

## Commands

- Starting the server in development mode:
  - `npm start` - starts the nodejs app
  - `npm run dev-server` - starts the webpack dev server
- Linting:
  - `npm run eslint`
    - `npm run eslint -- --fix`
  - `npm run stylelint`
    - `npm run stylelint -- --fix`
- Database:
  - `npm run migrate`
  - `npm run reset-db`
- Testing
  - `npm t`
  - `npm run test:jsdom`
  - `npm run test:server`
- Webpack
  - `npm run build`

## Deploying

You'll need the following features and environment variables:

- S3 - required to host your images
  - `IMS_ACCESS_KEY_ID`
  - `IMS_SECRET_ACCESS_KEY`
  - `IMS_S3_BUCKET`
- Imgix - required to serve your images as IMS intentionally does not compress or resize images for you
  - `IMS_IMGIX_SUBDOMAIN`
  - `IMS_IMGIX_API_KEY`

## Architecture

This is also my personal reference app.
Please see [Architecture](ARCHITECTURE.md) for more information.

## License

MIT

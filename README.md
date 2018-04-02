# IMS – Image Management System

[![CircleCI](https://circleci.com/gh/jonathanong/ims/tree/master.svg?style=svg&circle-token=e671a5694822728e67dc35852856d4705d6195c6)](https://circleci.com/gh/jonathanong/ims/tree/master)
[![codecov](https://codecov.io/gh/jonathanong/ims/branch/master/graph/badge.svg?token=vUSQgvaoCK)](https://codecov.io/gh/jonathanong/ims)

![https://codecov.io/gh/jonathanong/ims/branch/master](https://codecov.io/gh/jonathanong/ims/branch/master/graphs/sunburst.svg?token=vUSQgvaoCK)

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
- Storybook:
  - `npm run storybook` - run the storybook server
  - `npm run build-storybook` - build a static version of the storybook
- Linting:
  - `npm run eslint`
    - `npm run eslint -- --fix`
  - `npm run stylelint`
    - `npm run stylelint -- --fix`
- Database:
  - `npm run migrate`
  - `npm run reset-db`
- Testing
  - `npm t` - run all tests
  - `npm run test:jsdom` - run the jsdom tests
  - `npm run test:server` - run the server tests
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

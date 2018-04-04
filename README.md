# IMS – Image Management System

[![CircleCI](https://circleci.com/gh/jonathanong/ims/tree/master.svg?style=svg&circle-token=e671a5694822728e67dc35852856d4705d6195c6)](https://circleci.com/gh/jonathanong/ims/tree/master)
[![codecov](https://codecov.io/gh/jonathanong/ims/branch/master/graph/badge.svg?token=vUSQgvaoCK)](https://codecov.io/gh/jonathanong/ims)
[![Greenkeeper badge](https://badges.greenkeeper.io/jonathanong/ims.svg?token=8a849d24c0cf36b8b1eeda246dcbb5ae15d67ac4df1ac26f6cac1f699ae096c6&ts=1522645479435)](https://greenkeeper.io/)

[![codecov](https://codecov.io/gh/jonathanong/ims/branch/master/graphs/sunburst.svg?token=vUSQgvaoCK)](https://codecov.io/gh/jonathanong/ims/branch/master)

IMS is an image management system designed for managing your static assets. It's not designed to be a full-fledged CMS or DAM.
This is also my reference app architecture. See [Architecture](ARCHITECTURE.md) for more information.

## Features

- Image uploading
- Image serving
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
  - `npm run migrate` - run migrations
  - `npm run reset-db` - resets the database
- Testing
  - `npm t` - run all tests
  - `npm run test:jsdom` - run the jsdom tests
  - `npm run test:server` - run the server tests
  - `npm run monitors` - run monitors
  - `npm run automation` - run Selenium tests acceptance tests
- Webpack
  - `npm run build` - build production builds
  - `npm run build-watch` - auto-build production builds without minification for debugging

## Deploying

You'll need the following features and environment variables:

- S3 - required to host your images
  - `IMS_ACCESS_KEY_ID`
  - `IMS_SECRET_ACCESS_KEY`
  - `IMS_S3_BUCKET`
- Imgix - required to serve your images as IMS intentionally does not compress or resize images for you
  - `IMS_IMGIX_SUBDOMAIN`
  - `IMS_IMGIX_API_KEY`

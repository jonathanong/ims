# IMS – Image Management System

[![CircleCI](https://circleci.com/gh/jonathanong/ims/tree/master.svg?style=svg&circle-token=e671a5694822728e67dc35852856d4705d6195c6)](https://circleci.com/gh/jonathanong/ims/tree/master)
[![codecov](https://codecov.io/gh/jonathanong/ims/branch/master/graph/badge.svg?token=vUSQgvaoCK)](https://codecov.io/gh/jonathanong/ims)

IMS is an image management system designed for managing your static assets. It's not designed to be a full-fledged CMS or DAM.

## Features

- Tagging
- CDN Support
  - Imgix - for resizing, compressing, and manipulating your image
  - AWS CloudFront
  - CloudFlare

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

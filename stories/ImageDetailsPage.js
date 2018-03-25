
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageDetailsPage from '../client/components/ImageDetailsPage'
import '../client/ui/index.css'

const GOOGLE_LOGO_IMAGE = {
  id: 3,
  created_ts: new Date('2018-03-25T13:38:44.058Z'),
  updated_ts: new Date('2018-03-25T13:38:44.058Z'),
  source_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  pathname: 'test/cc7hj5bw2jo.png',
  title: 'z5vn9gr3wja',
  description: '',
  deleted: false,
  deleted_ts: null,
  format: 'png',
  width: 544,
  height: 184,
  space: 'srgb',
  channels: 4,
  density: null,
  has_profile: false,
  has_alpha: true,
  orientation: null,
  is_opaque: false,
  tags: [
    {
      id: 1,
      name: 'google'
    },
    {
      id: 2,
      name: 'logo'
    }
  ]
}

storiesOf('ImageDetailsPage', module)
  .add('w/ Google Logo', () => (
    <ImageDetailsPage image={GOOGLE_LOGO_IMAGE} />
  ))

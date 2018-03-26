
import { storiesOf } from '@storybook/react'
import React from 'react'

import ImageGrid from '../../client/components/ImageGrid'
import images from '../fixtures/images'
import Container from './Container'
import '../../client/ui/index.css'

function createImages (i) {
  if (!i) return 0
  const arr = []
  for (let x = 0; x < i; x++) {
    arr.push(...images.map(x => Object.assign({}, x)))
  }
  return arr.map((x, i) => {
    x.id = i
    return x
  })
}

storiesOf('ImageGrid', module)
  .add('w/ 0 images', () => (
    <Container>
      <ImageGrid images={[]} />
    </Container>
  ))
  .add('w/ 2 images', () => (
    <Container>
      <ImageGrid images={createImages(1)} />
    </Container>
  ))
  .add('w/ 4 images', () => (
    <Container>
      <ImageGrid images={createImages(2)} />
    </Container>
  ))
  .add('w/ 8 images', () => (
    <Container>
      <ImageGrid images={createImages(4)} />
    </Container>
  ))
  .add('w/ 16 images', () => (
    <Container>
      <ImageGrid images={createImages(8)} />
    </Container>
  ))
  .add('w/ 32 images', () => (
    <Container>
      <ImageGrid images={createImages(16)} />
    </Container>
  ))

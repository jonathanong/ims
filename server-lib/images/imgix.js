
const request = require('request')

const {
  apiKey,
  subdomain
} = require('../config').imgix

exports.purgeImgixCache = (pathname) => new Promise((resolve, reject) => {
  request({
    url: 'https://api.imgix.com/v2/image/purger',
    method: 'POST',
    auth: {
      user: apiKey,
      pass: ''
    },
    form: {
      url: `https://${subdomain}.imgix.net${pathname}`
    }
  }, (err, res, body) => {
    if (err) return reject(err)
    resolve({
      res,
      body
    })
  })
})

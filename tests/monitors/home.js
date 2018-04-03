
const puppeteer = require('puppeteer')

const { domain } = require('../config')

async function monitor ({ parameters }) {
  const browser = await puppeteer.launch({

  })
  const page = await browser.newPage()
  await page.goto(parameters.url, {
    timeout: 5000
  })
  await page.waitForSelector(parameters.selector, {
    timeout: 5000
  })
  await page.close()
  await browser.close()
}

exports.slowThreshold = '30s'
exports.monitors = [
  {
    id: domain,
    parameters: {
      url: domain,
      selector: '#root a'
    },

    monitor,

    slowThreshold: '2s',
    timeout: '10s',
    retries: 1
  }
]

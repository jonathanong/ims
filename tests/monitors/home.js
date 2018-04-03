
const puppeteer = require('puppeteer')

const { domain } = require('../config')

let browser
let page

async function beforeEach () {
  browser = await puppeteer.launch({
    headless: false
  })
}

async function monitor ({ parameters }) {
  page = await browser.newPage()
  await page.goto(parameters.url, {
    timeout: 5000
  })
  await page.waitForSelector(parameters.selector, {
    timeout: 5000
  })
}

async function afterEach () {
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

    beforeEach,
    monitor,
    afterEach,

    slowThreshold: '2s',
    timeout: '10s',
    retries: 1
  }
]

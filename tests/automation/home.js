
const { By, until } = require('selenium-webdriver')

const { domain } = require('../config')

exports.description = `
Load the home page.
`

exports.options = {}
exports.parameters = {
  domain
}

exports.test = ({
  driver,
  step,
  parameters
}) => {
  const { domain } = parameters

  step('Visit the homepage.', async () => {
    await driver.get(domain)
    await driver.wait(until.urlContains(domain))
  })

  step('Wait until the logo appears.', async () => {
    await driver.wait(until.elementLocated(By.css('#root a')))
  })
}

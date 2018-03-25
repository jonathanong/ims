
const path = require('path')
const fs = require('fs')

const psql = require('./')

const migrationsFolder = path.resolve(__dirname, 'migrations')
const migrations = fs.readdirSync(migrationsFolder).sort((a, b) => a.localeCompare(b))

module.exports = async () => {
  for (const migration of migrations) {
    if (path.extname(migration) === '.sql') {
      await psql.query(fs.readFileSync(path.resolve(migrationsFolder, migration), 'utf8'))
    }
  }
}

if (!module.parent) {
  module.exports().then(() => {
    console.log('Migrations complete!')
    process.exit(0)
  }, (err) => {
    console.error(err.stack || err)
    process.exit(1)
  })
}


if (process.env.NODE_ENV === 'production') {
  console.error('DO NOT RUN THIS IN PRODUCTION!')
  process.exit(1)
}

const migrate = require('./migrate')
const db = require('./')

async function run () {
  await db.query(`DROP SCHEMA IF EXISTS PUBLIC CASCADE;`)
  await db.query(`CREATE SCHEMA IF NOT EXISTS PUBLIC;`)
  await migrate()
}

run().then(() => {
  process.exit(0)
}, (err) => {
  console.error(err.stack)
  process.exit(1)
})

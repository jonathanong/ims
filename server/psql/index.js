
/* eslint no-console: 0 */

const ConnectionParameters = require('pg/lib/connection-parameters')
const {
  Pool,
  types
} = require('pg')

let options = process.env.DATABASE_URL ||
  process.env.POSTGRES_URI ||
  process.env.PG_URI ||
  'postgres://localhost/ims'

// we overload DBs if we run too many in parallel
if (process.env.NODE_ENV === 'test') {
  options = new ConnectionParameters(options)
  options.max = 2
  options.idleTimeoutMillis = 100
} else if (typeof options === 'string') {
  options = {
    connectionString: options
  }
}

const client = new Pool(options)

const DATE_OID = 1082
const NUMERIC_OID = 1700

types.setTypeParser(DATE_OID, val => val)
types.setTypeParser(NUMERIC_OID, val => parseFloat(val))

exports.query = (query, values) => {
  return client.query(query, values).catch((err) => {
    console.error('ERROR: query failed!')
    console.error(query)
    if (Array.isArray(values)) console.error(values)
    console.error(err)
    throw err
  })
}

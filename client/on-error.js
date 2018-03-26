
/* global Rollbar */
export default (err) => {
  if (!err) return

  if (typeof Rollbar !== 'undefined') Rollbar.error(err)

  console.error(err)
}

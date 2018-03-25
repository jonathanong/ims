
exports.pathname = x => String(x || '').replace(/\s+/g, '').toLowerCase()
exports.title = x => String(x || '').trim()
exports.description = x => String(x || '').trim()
exports.tag = x => String(x || '').trim().replace(/\s+/g, ' ').toLowerCase()

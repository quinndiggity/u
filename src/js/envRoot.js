//root|global object|env
envRoot = {
  require, isf, iss, isa, iso, isn, isi,
  js: global || window,
  log: console.log,
  keys: Object.keys,
  true: true, false: false, undefined: undefined, null: null,
  return: '⏎⏎',
  '+'(...a) {
    if (isa(a[0])) a = a[0]
    return a.reduce((b, c) => b + c)
  },
  '-': (...a) => a.reduce((b, c) => b - c),
  '*': (...a) => a.reduce((b, c) => b * c),
  '/': (...a) => a.reduce((b, c) => b / c),
  '%': (...a) => a.reduce((b, c) => b % c),
  '&': (...a) => a.reduce((b, c) => b && c),
  '|': (...a) => a.reduce((b, c) => b || c),
  '=': (...a) => {
    i = a.length
    while (--i && a[0] === a[i]);
    return i > 0 ? false : true
  },
  '!=': (...a) => !envRoot['='](...a),
  '<': (...a) => {
    i = a.length
    while (--i && a[i] > a[i - 1]);
    return i == 0 ? true : false
  },
  '>=': (...a) => !envRoot['<'](...a),
  '>': (...a) => {
    i = a.length
    while (--i && a[i] < a[i - 1]);
    return i == 0 ? true : false
  },
  '<=': (...a) => !envRoot['>'](...a),
  '!': x => !x,
  lowercase: str => str.toLowerCase(),
  delete(seq, ...keys) { e(keys, key => delete seq[key]) },
  merge: (...a) => a.reduce((ret,arr)=> [...ret, ...arr]),
  clone: x => JSON.parse(JSON.stringify(x)),
  assign: (o1, target) => Object.assign(target || {}, o1),
  has: (x, arr) => arr.indexOf(x) > -1,
  ppend(x, arr) { arr.unshift(x); return arr },
  apend(x, arr) { arr.push(x); return arr },
  innerHTML(html, id) {
    document.getElementById(id || 'app').innerHTML = html
  }
}
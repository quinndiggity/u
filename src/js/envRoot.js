//root|global object|env
envRoot = {
  js: global || window,
  log: console.log,
  keys: Object.keys,
  isf, iss, isa, iso, isn, isi,
  true: true, false: false, undefined: undefined, null: null,
  '+'(...a) {
    if (isa(a[0])) a = a[0]
    return a.reduce((b, c) => b + c)
  },
  '-': (...a) => a.reduce((b, c) => b - c),
  '*': (...a) => a.reduce((b, c) => b * c),
  '/': (...a) => a.reduce((b, c) => b / c),
  '%': (...a) => a.reduce((b, c) => b % c),
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
  str: (...a) => a.join(' '),
  clone: x => JSON.parse(JSON.stringify(x)),
  assign: (o1, target) => Object.assign(target || {}, o1),
  ppend: (x, arr) => arr.unshift(x),
  apend: (x, arr) => arr.push(x),
  innerHTML(html, id) {
    document.getElementById(id || 'app').innerHTML = html
  }
}
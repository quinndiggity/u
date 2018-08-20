//root|global object|env
_root = {
  isf, iss, isa, iso, isn, isi,
  log: console.log,
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
  '!=': (...a) => !_root['='](...a),
  '<': (...a) => {
    i = a.length
    while (--i && a[i] > a[i - 1]);
    return i == 0 ? true : false
  },
  '>=': (...a) => !_root['<'](...a),
  '>': (...a) => {
    i = a.length
    while (--i && a[i] < a[i - 1]);
    return i == 0 ? true : false
  },
  '<=': (...a) => !_root['>'](...a),
  str: (...a) => a.join(' '),
  clone: x => JSON.parse(JSON.stringify(x)),
  assign: (o1, target) => Object.assign(target || {}, o1),
  ppend: (x, arr) => arr.unshift(x),
  apend: (x, arr) => arr.push(x),
  innerHTML(html, id) {
    document.getElementById(id || 'app').innerHTML = html
  }
}
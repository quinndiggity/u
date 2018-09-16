//root|global object|env
envRoot = {
  require, isf, iss, isa, iso, isn, isi,
  is_root_dir: s => s[0]=='~' || s[0]=='/' || s[1]==':',
  js: global || window,
  log: console.log,
  keys: Object.keys,
  true: true, false: false, undefined: undefined, null: null,
  return: '⏎⏎',
  '+'(...a) {
    if (isa(a[0])) a = a[0]
    if (a[0] == undefined) return ''
    return a.reduce((b, c) => b + c)
  },
  '-': (...a) => a.reduce((b, c) => b - c),
  '*': (...a) => a.reduce((b, c) => b * c),
  '÷': (...a) => a.reduce((b, c) => b / c),
  '%': (...a) => a.reduce((b, c) => b % c),
  '&': (...a) => a.reduce((b, c) => b && c),
  '|': (...a) => a.reduce((b, c) => b || c),
   or: (...a) => a.reduce((b, c) => b || c),
  '^': (...a) => a.reduce((b, c) => b.slice(c)),
  '=': (...a) => {
    i = a.length
    while (--i && a[0] === a[i]);
    return i > 0 ? false : true
  },
  '!=': (...a) => !envRoot['='](...a),
  '≠': (...a) => !envRoot['='](...a),
  '<': (...a) => {
    i = a.length
    while (--i && a[i] > a[i - 1]);
    return i == 0 ? true : false
  },
  '>=': (...a) => !envRoot['<'](...a),
  '≥': (...a) => !envRoot['<'](...a),
  '>': (...a) => {
    i = a.length
    while (--i && a[i] < a[i - 1]);
    return i == 0 ? true : false
  },
  '<=': (...a) => !envRoot['>'](...a),
  '≤': (...a) => !envRoot['>'](...a),
  '!': x => !x,
  '/': (...a) => a.reduce((b, c) => {
    if (isn(c)) return b[c]
    if (!c) return
    return c.split('.').reduce(
      (val, key) => val ? val[key] : undefined, b
    )
  }),
  JSONparse(str) {
    try { return JSON.parse(str) }
    catch (e) { return false }
  },
  lowercase: str => str.toLowerCase(),
  split: (str, x) => str.split(x),
  delete(seq, ...keys) { e(keys, key => delete seq[key]) },
  merge: (...a) => a.reduce((ret,arr)=> [...ret, ...arr]),
  clone: x => JSON.parse(JSON.stringify(x)),
  assign: (unchange, target) => Object.assign(target || {}, unchange),
  has: (x, arr, start) => arr.indexOf(x, start)+1,
  indexFo: (x, arr, start) => arr.lastIndexOf(x, start),
  indexOf: (x, arr, start) => arr.indexOf(x, start),
  pp(x, arr) { arr.unshift(x); return arr },
  push(x, arr) { arr.push(x); return arr },
  pop: arr => arr.pop(),
  join: (str, arr) => arr.join(str),
  slice: (seq, begin, end) => seq.slice(begin, end),
  splice(seq, begin, count, add) {
    if (isa(seq)) {
      if (add === undefined)
        seq.splice(begin, count)
      else
        seq.splice(begin, count, add)
      return seq
    }
    let arr = seq.split('')
    arr.splice(begin, count, add)
    return arr.join('')
  },
  renderHTML(html, id) {
    document.getElementById(id || 'app').innerHTML = html
  },
  byid: id => document.getElementById(id),
  focus_textarea() {
    document.getElementById('textarea').focus()
  },
  blur() {
    document.activeElement.blur()
  },
  addEventListener(elem, event, fj) {
    elem.addEventListener(event, fj)
  },
  GET(path, callback) {
    fetch(path, { method: "GET" })
      .then(res => res.json())
      .then(callback)
  },
  POST(data, callback) {
    fetch("post", { method: "POST", body: JSON.stringify(data) })
      .then(res => res.json())
      .then(callback)
  }
}

envRoot._this = envRoot
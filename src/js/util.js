// better x.forEach for array and string
e = function (x, fn) {
  for (let i = 0; i < x.length; i++) {
    fn(x[i], i)
  }
}
e2 = function (x, fn) {
  for (let i = 0; i < x.length; i+=2) {
    fn(x[i], x[i+1], i/2)
  }
}
// is object|string|function|array|integer|number|undefined
iso = x => Object.prototype.toString.call(x) == "[object Object]"
iss = x => typeof x == 'string'
isf = x => typeof x == 'function'
isa = Array.isArray
isi = Number.isInteger
isn = x => !isNaN(x)
isu = x => x === undefined
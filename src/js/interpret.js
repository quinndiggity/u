//Interpret expression
i_text = x => i_progn(parse(x))

i_progn = (progn, env) =>
  progn.reduce((_, exp) => i_exp(exp, env), 0)

i_exp = (exp, env = _root) => {
  if (iss(exp))
    return i_str(exp, env)
  if (isa(exp))
    return i_arr(exp, env)
  if (isn(exp))
    return exp
  console.log('i_exp', exp)
}
//interpret string
_keyword = { true: true, false: false, undefined: undefined, null: null }
i_str = (str, env) => {
  if (_keyword[str])
    return _keyword[str]
  if (!isNaN(str))
    return Number(str)
  if (f = _prefix[str[0]])
    return f(str.slice(1), env)
  if (str.length > 2 && (ret = i_infix(str, env)) != undefined)
    return ret
  return i_env.get(str, env)
}

let reInfix = new RegExp(`[${Object.keys(_infix).join('').replace('-', '\\-')}]`)
i_infix = (str, env) => {
  let matched = str.match(reInfix)
  if (matched) {
    let i = matched.index,
      a = i_str(str.slice(0, i), env),
      b = i_str(str.slice(i + 1), env)
    return _infix[matched[0]](a, b)
  }
}
//interpret array
i_arr = ([x,...args], env) => {
  let fx = _eval_as[x]
  if (fx)
    return fx(args, env)
  let x = i_exp(x, env)
  if (x == true)
    return i_exp(args[0], env)
  if (x == false)
    return i_exp(args.slice(1), env)
  let args = args.map(arg => i_exp(arg, env))
  if (isf(x))
    return x(...args)
  if (isa(x))
    return i_args(args, x, env)
}

i_args = (args, exp, env) => {
  _env = { _env: env }
  progn = exp.slice(0)
  while (progn.length > 1 && !isa(progn[0]))
    _env[progn.shift()] = args.shift()
  if (args.length) _env.$ = args
  return i_progn(progn, _env)
}
//interpret enviroment of variables
i_env = {
  parse(str, obj) {
    keys = []
    prop = ''
    function unshift(isVar) {
      keys.unshift(isVar ? i_env.resolve([prop],obj)[prop] : prop)
      prop = ''
    }
    for (len = str.length; len > 0; len--) {
      let c = str[len - 1]
      if (c == ".") unshift()
      else if (c == ',') unshift(true)
      else prop = c + prop
    }
    unshift()
    return keys
  },
  lookup(key, obj) {
    let _env = obj
    while (_env && _env[key]===undefined)
      _env = _env._env
    return _env || obj
  },
  new(obj) {
    let ret = Object.create(null)
    ret._env = obj
    return ret
  },
  resolve(keys, obj) {
    let ret
    e(keys, key => {
      ret = i_env.lookup(key, obj)
      obj = ret[key]
    })
    return ret
  },
  get(str, obj) {
    let keys = i_env.parse(str, obj)
    return i_env.resolve(keys, obj)[keys.pop()]
  },
  let(str, obj, val) {
    let keys = i_env.parse(str, obj)
    while (keys.length>1)
      obj = obj[keys.shift()]
    return obj[keys[0]] = val
  },
  set(str, obj, val) {
    let keys = i_env.parse(str, obj)
    return i_env.resolve(keys, obj)[keys.pop()] = val
  },
  del(str, obj) {
    let keys = i_env.parse(str, obj),
      env = i_env.resolve(keys, obj),
      key = keys.pop()
    if (env[key] !== undefined)
      delete env[key]
  }
}

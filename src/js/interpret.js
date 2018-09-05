//Interpret expression
i_text = x => i_exps(parse(x), envRoot)

i_exps = (exps, env) => {
  let ret
  for (let i = 0; i < exps.length; i++) {
    let exp = exps[i]
    if (iss(exp))
      return i_exp(exp, env)
    if (isa(exp))
      ret = i_exp(exp, env)
    if (ret === '⏎⏎')
      return
  }
  return ret
}

i_exp = (exp, env) => {
  if (iss(exp))
    return i_str(exp, env)
  if (isa(exp))
    return i_arr(exp, env)
  console.log('i_exp', exp)
}
//interpret string
i_str = (str, env) => {
  if (!isNaN(str))
    return Number(str)
  if (f = _prefix[str[0]])
    return f(str.slice(1), env)
  if (str.length > 2 && (ret = i_infix(str, env)) != undefined)
    return ret
  return enviroment.get(str, env)
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
i_arr = ([x, ...args], env) => {
  let fx = _raw[x]
  if (fx)
    return fx(args, env)
  x = i_exp(x, env)
  if (x == true)
    return i_exp(args[0], env)
  if (x == false)
    return i_exp(args.slice(1), env)
  if (isf(x))
    return x(...args.map(arg => i_exp(arg, env)))
  if (isa(x))
    return i_args(args, x, env)
}

i_args = (args, [_env, assignKey, params, exps], env) => {
  _assign[assignKey](params.slice(0), args, _env, env)
  return i_exps(exps, _env)
}
 
_assign = {
  all(params, args, _env, env) {
    while (params.length && args.length)
      _env[params.shift()] = i_exp(args.shift(), env)
    let len = args.length
    if (len > 1)
      _env.$ = args.map(arg => i_exp(arg, env))
    if (len == 1) {
      let arg = i_exp(args[0], env)
      if (iso(arg))
        e(Object.keys(arg), key => _env[key] = arg[key])
      else
        _env.$ = arg
    }
  },
  none(params, args, _env) {
    while (params.length && args.length)
      _env[params.shift()] = args.shift()
    if (args.length)
      _env.$ = args.map(arg => arg)
  },
  odd(params, args, _env, env) {
    e2(params, (p1, p2) => {
      _env[p1] = args.shift()
      _env[p2] = i_exp(args.shift(), env)
    })
    if (args.length)
      _env.$ = args.map((arg, i) =>
        (i & 1) ? i_exp(arg, env) : arg)
  }
}
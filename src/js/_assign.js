_assign = {
  all(params, args, _env) {
    while (params.length && args.length)
      _env[params.shift()] = i_exp(args.shift(), _env)
    if (args.length)
      _env.$ = args.map(arg => i_exp(arg, _env))
  },
  none(params, args, _env) {
    while (params.length && args.length)
      _env[params.shift()] = args.shift()
    if (args.length)
      _env.$ = args.map(arg => arg)
  },
  odd(params, args, _env) {
    e2(params, (p1, p2) => {
      _env[p1] = args.shift()
      _env[p2] = i_exp(args.shift(), _env)
    })
    if (args.length)
      _env.$ = args.map((arg, i) =>
        (i & 1) ? i_exp(arg, _env) : arg)
  }
}
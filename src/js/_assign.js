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
  },
  alt(params, args, _env) {
    e2(params, (p1, p2) => {
      _env[p1] = args.shift()
      _env[p2] = i_exp(args.shift(), _env)
    })
  }
}
//eval an Array of Strings
function closure(assignKey, as, env) {
  let params = []
  let exps = _raw.as(as, env)
  while (exps.length > 1 && !isa(exps[0]))
    params.push(exps.shift())
  return [env, assignKey, params, exps]
}
_raw = {
  l(as, env) {
    e(as, exp => console.log(exp, ':', i_exp(exp, env)))
  },
  f(as, env) {
    return closure('all', as, env)
  },
  fn(as, env) {
    return closure('none', as, env)
  },
  fo(as, env) {
    return closure('odd', as, env)
  },
  fj(as, env) {
    let [_env, _, params, exps] = closure('all', as, env)
    return (...args) => {
      e(params, (param, i) => _env[param] = args[i])
      return i_exps(exps, _env)
    }
  },
  fv(as, env) {
    return closure('all', as, envRoot.views)
  },
  fm(as, env) {
    as.unshift('m')
    return closure('all', [as[1], as], env)
  },
  _a(as, env) {
    return as.map(s => i_exp(s, env))
  },
  as(as, env) {
    return as.map(x => {
      if (isa(x))
        return _raw.as(x)
      return x
    })
  },
  _o(as, env) {
    let or = Object.create(null)
    e2(as, (s1, s2) => {
      x1 = s1[0] == ',' ?
        i_str(s1.slice(1), env) : s1
      or[x1] = i_exp(s2, env)
    })
    return or
  },
  os(as) {
    let or = Object.create(null)
    e2(as, (s1, s2) => or[s1] = s2)
    return or
  },
  g(as, env) {
    return as.reduce((acc, cur) => {
      return acc[i_str(cur, env)]
    }, i_str(as.shift(), env))
  },
  s(as, env) {
    e2(as, (s1, s2) => {
      if (iss(s1))
        enviroment.set(s1, env, i_exp(s2, env))
    })
  },
  s_obj([obj, ...as], env) {
    obj = i_exp(obj, env)
    e2(as, (s1, s2) => obj[s1] = i_exp(s2, env))
  },
  s_root(as, env) {
    e2(as, (s1, s2) =>
      enviroment.set(i_exp(s1, env), envRoot, i_exp(s2, env))
    )
  },
  's+'([name, val], env) {
    enviroment.set(name, env, i_exp(name, env) + i_exp(val, env))
  },
  let(as, env) {
    e2(as, (s1, s2) => {
      enviroment.let(s1, env, i_exp(s2, env))
    })
  },
  m([s, ...cond], env) {
    xs = i_exp(s, env)
    matched = false
    for (i = 0; i < cond.length; i += 2) {
      xc = i_exp(cond[i], env)
      if (xc === true) matched = 1
      else if (isf(xc) && xc(xs) === true) matched = 1
      else if (xc === xs) matched = 1
      if (matched) {
        as = cond[i + 1]
        if (isa(as))
          return i_arr(as, env)
        return i_str(as, env)
      }
    }
  },
  if(as, env) {
    env.$ = i_exp(as.shift(), env)
    if (env.$)
      return i_exp(as[0], env)
    if (as.length > 1)
      return i_exps(as.slice(1), env)
  },
  ifn(as, env) {
    env.$ = i_exp(as.shift(), env)
    if (!env.$)
      return i_exp(as[0], env)
    if (as.length > 1)
      return i_exps(as.slice(1), env)
  },
  ifd(as, env) {
    env.$ = i_exp(as.shift(), env)
    if (env.$)
      return i_exps(as, env)
  },
  ifu(as, env) {
    env.$ = i_exp(as.shift(), env)
    if (env.$ === undefined)
      return i_exp(as[0], env)
    if (as.length > 1)
      return i_exps(as.slice(1), env)
  },
  do(as, env) {
    return i_exps(as, env)
  },
  for([xn, ...exps], env) {
    let _env = { _env: env }
    for (let i = 0; i < i_exp(xn, env); i++) {
      _env.$ = i
      let ret = i_exps(exps, _env)
      if (iss(ret) && ret == '⏎⏎')
        return
    }
  },
  str(as, env) {
    return as.map(x => x[0] == ',' ? i_str(x.slice(1), env) : x).join(' ')
  }
}

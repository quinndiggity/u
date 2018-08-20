//eval an Array of Strings
_eval_as = {
  f(as, env) {
    return as.map(x => {
      if (isa(x))
        return x[0] == ','
          ? i_exp(x.slice(1), env)
          : envRaw.f(x)
      return x
    })
  },
  _a(as, env) {
    return as.map(s => i_exp(s, env))
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
        i_env.set(s1, env, i_exp(s2, env))
    })
  },
  let(as, env) {
    e2(as, (s1, s2) => {
      i_env.let(s1, env, i_exp(s2, env))
    })
  },
  delete(as, env) {
    e(as, key => i_env.del(key, env))
  },
  fm(as) {
    as.unshift('m')
    return [as[1], as]
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
  ['?'](as, env) {
    env.$ = i_exp(as.shift(), env)
    if (env.$)
      return i_exp(as[0], env)
    if (as.length > 1)
      return i_progn(as.slice(1), env)
  },
  ['u?'](as, env) {
    env.$ = i_exp(as.shift(), env)
    if (env.$ === undefined)
      return i_exp(as[0], env)
    if (as.length > 1)
      return i_progn(as.slice(1), env)
  },
  p(as, env) {
    return i_progn(as, env)
  },
  t(as, env) {
    return as.map(x => x[0] == ',' ? i_str(x.slice(1), env) : x).join(' ')
  },
  e([seq, exp], env) {
    seq = i_exp(seq, env)
    exp = i_exp(exp, env)
    if (iso(seq))
      e(Object.keys(seq), key => {
        i_args([seq[key], key], exp, env)
      })
    else
      for (let i = 0; i < seq.length; i++)
        i_args([seq[i], i], exp, env)
  },
  map([seq, exp], env) {
    return i_exp(seq, env).map((x, i) => {
      return i_args([x, i], i_exp(exp, env), env)
    })
  }
}
_escapeChar = {
  t: '\t', n: '\n', s: ' ', p: '(', q: ')', b: '[', d: ']'
}

_prefix = {
  "|": s => _escapeChar[s],
  "'": s => s,
  '!': (s, env) => !i_str(s, env),
  '-': (s, env) => -i_str(s, env),
  ':': s => s ? new Date(s) : new Date(),
  '/': s => {
    i_2 = s.length - 2
    if (s[i_2] == '/')
      return new RegExp(s.slice(0, i_2), s[i_2 + 1])
    return new RegExp(s)
  }
}
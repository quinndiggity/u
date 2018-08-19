parse = s => parse_array(parse_string(s))
// parse a string of code
parse_string = function (string) {
  //return a flat array of tokens
  aflat = []
  //current token
  stoken = ""
  //push and reset current stoken to aflat
  function push_token(...a) {
    if (stoken) aflat.push(stoken)
    stoken = ""
    aflat.push(...a)
  }
  inComment = false
  inBrackets = 0
  // parse each character
  e(string, c => {
    // line comment
    if (inComment) {
      if (/\r|\n/.test(c))
        inComment = false
      // else ignore c
    }
    else if (c == '~') {
      inComment = true
    }
    // brackets
    else if (/\(|\[|\{/.test(c)) {
      push_token('[')
      inBrackets++
      if (c == '[') push_token('_a')
      if (c == '{') push_token('_o')
    }
    else if (/\)|\]|\}/.test(c)) {
      push_token(']')
      inBrackets--
    }
    // whitespace
    else if (/\s/.test(c)) push_token()
    // other character
    else if (inBrackets) {
      stoken += c
    }
  })
  // push the last stoken and then return aflat
  push_token()
  return aflat
}
// turn flat array of stoken to nested array of stoken
parse_array = function (aremain, anested = []) {
  // next stoken
  stoken = aremain.shift()
  // no remaining stoken, return nested array of stoken
  if (!stoken) return anested
  // return the lower level nested array
  if (stoken == "]") return anested
  // push the returned nested array to current level
  if (stoken == "[") anested.push(parse_array(aremain))
  // else push next stoken to current level
  else anested.push(stoken)
  // recursively handle the remaining stoken
  return parse_array(aremain, anested)
}
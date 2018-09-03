enviroment = {
  parse(str, obj) {
    keys =  []
    prop = ''
    function unshift(isVar) {
      keys.unshift(isVar ? enviroment.resolve([prop], obj)[prop] : prop)
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
    while (_env && _env[key] === undefined)
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
      ret = enviroment.lookup(key, obj)
      obj = ret[key]
    })
    return ret
  },
  get(str, obj) {
    let keys = enviroment.parse(str, obj)
    return enviroment.resolve(keys, obj)[keys.pop()]
  },
  let(str, obj, val) {
    let keys = enviroment.parse(str, obj)
    while (keys.length > 1)
      obj = obj[keys.shift()]
    return obj[keys[0]] = val
  },
  set(str, obj, val) {
    let keys = enviroment.parse(str, obj)
    return enviroment.resolve(keys, obj)[keys.pop()] = val
  },
  del(str, obj) {
    let keys = enviroment.parse(str, obj),
      env = enviroment.resolve(keys, obj),
      key = keys.pop()
    if (env[key] !== undefined)
      delete env[key]
  }
}
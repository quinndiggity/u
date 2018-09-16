post = {
  save_file(dirname, filename, data) {
    console.log(dirname, filename, data)
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }
    if (dirname.substr(-1) != '/') dirname += '/'
    fs.writeFileSync(dirname + filename, JSON.stringify(data))
  },
  save_dir(dirname, data) {
    console.log('save_dir',dirname)
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname)
    }
    if (dirname.substr(-1) != '/') dirname += '/'
    fs.writeFileSync(dirname + '_all.json', JSON.stringify(data))
  },
  load_dir(dirname) {
    console.log('load_dir', dirname)
    if (dirname.substr(-1) != '/') dirname += '/'
    let fname = dirname + '_all.json'
    if (fs.existsSync(fname)) {
      return fs.readFileSync(fname, 'utf8')
    }
  }
}
require('http').createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(fs.readFileSync("./docs/index.html"))
  }
  else if (req.url.substr(-3) == '.js') {
    res.writeHead(200, { "Content-Type": "text/javascript" })
    res.end(fs.readFileSync('./docs/' + req.url))
  }
  else if (req.method == "POST") {
    let data = ""
    req.on("data", chunk => { data += chunk })
    req.on("end", () => {
      data = JSON.parse(data)
      res.writeHead(200)
      if (data.shift) {
        let name = data.shift()
        res.end(post[name](...data) || '""')
      }
      else {
        res.end('"not array"')
      }
    })
  }
  else if (req.url == '/sse') {
    res.writeHead(200, {
      'Content-Type': "text/event-stream",
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    })
    let interval = setInterval(() => {
      res.write(`event:sse\ndata:${new Date()}\n\n`)
    }, 3000)
    req.on('close', () => {
      clearInterval(interval)
      res.end()
    })
  }
}).listen(3434)
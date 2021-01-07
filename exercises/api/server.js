const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  return new Promise ((resolve, reject) => {
    const assetPath = path.join(__dirname, 'assets', name)
    fs.readFile(assetPath, {encoding: 'utf-8'}, (err, asset) => {
      if (err) {
        reject(err)
      } else {
        resolve(asset)
      }
    })
  }
  )
}

const hostname = '127.0.0.1'
const port = 3000
const router = {
  '/ GET': {
    asset: 'index.html',
    type: mime.getType('html')
  },
  '/style.css GET': {
    asset: 'style.css',
    type: mime.getType('css')
  }
}

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname

  const routeMatch = router[`${route} ${method}`]
  if (!routeMatch) {
    res.writeHead(404)
    logRequest(method, route, 404)
    return res.end()
  }

  const {type, asset} = routeMatch

  res.writeHead(200, {'Content-Type': type})

  res.write(await findAsset(asset))
  logRequest(method, route, 200)
  res.end()
})
//   // this is sloppy, especially with more assets, create a "router"
//   if (route === '/') {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     res.write(findAsset('index.html'))
//     logRequest(method, route, 200)
//     res.end()
//   } else {
//     // missing asset should not cause server crash
//     logRequest(method, route, 404)
//     res.end()
//   }
//   // most important part, send down the asset
// })

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

const memRoutes = {}
const error404 = (code) => new Response(undefined,{status:code})

async function memoization(route){
  memRoutes[route] = (
    memRoutes[route] || 
    (await import(`./${route}/index.js`))?.default 
  )
  return memRoutes[route]()
}

function process(routes) {
  const result = {
    fetch(req,res){
      const url = (new URL(req.url)).pathname?.trim()
      console.log('fetch')
      return memoization(url)
    },
    error(error){
      return error404('404')
    }
  }
  return result
} 

export default process()

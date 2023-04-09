export default (routes,config) => {
  const args =     {
      ...config,
      ...routes
    }

  console.log(
    args
  )
  return Bun.serve( args )
}

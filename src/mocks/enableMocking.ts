export const enableMocking = async () => {
  console.log('Check env', {
    ENV: process.env.NODE_ENV,
    MSW: process.env.NEXT_PUBLIC_MSW,
  })
  if (process.env.NODE_ENV !== 'development') return
  if (process.env.NEXT_PUBLIC_MSW !== 'true') return

  if (typeof window === 'undefined') {
    // NODE.JS (Server Side)
    const { server } = await import('./server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    // BROWSER (Client Side)
    const { worker } = await import('./browser')
    console.log('MSW: Trying to start worker...')
    await worker.start({ onUnhandledRequest: 'bypass' })
    console.log('MSW: Worker started successfully!')
  }
}

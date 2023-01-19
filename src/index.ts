import server from './shared/infra/http/app'

export = server.listen(4000, () => {
  console.log('Server running')
});

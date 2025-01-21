import jsonServer from 'json-server';
import jsonServerAuth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults(); // This includes CORS middleware

server.use(middlewares);
server.db = router.db; // Bind the router to the server
server.use(jsonServerAuth); // Auth middleware
server.use(router);

server.listen(3000, () => {
  console.log('Server is running');
});

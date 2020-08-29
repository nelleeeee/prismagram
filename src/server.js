import "./env";
import { GraphQLServer } from "graphql-yoga"; // graphql 서버(express 서버 내장. 미들웨어 사용은 express로)
import logger from "morgan"; // express 미들웨어 로거
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }), // 스키마, 리졸버
});

server.express.use(logger("dev")); //미들웨어 로거
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`😁 Server running on port ${PORT}`)
);

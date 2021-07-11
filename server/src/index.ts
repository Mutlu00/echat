import 'dotenv-safe/config';
import 'reflect-metadata';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const PgSession = connectPgSimple(session);

(async () => {
  const app = express();

  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  });

  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new PgSession({ conString: process.env.DATABASE_URL }),
      secret: process.env.SESSION_SECRET!,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.google.com' : undefined,
      },
    })
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`
    🚀  Server is running!
    🔉  Listening on port ${process.env.PORT}
    📭  Query at https://localhost:${process.env.PORT}/graphql
  `);
  });
})();

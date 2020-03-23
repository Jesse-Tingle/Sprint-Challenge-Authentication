const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
	session({
		name: "token",
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET || "secret",
		cookie: {
			httpOnly: true
			// maxAge: 15 * 1000
		},
		store: new KnexSessionStore({
			knex: dbConfig,
			createtable: true
		})
	})
);

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);

module.exports = server;

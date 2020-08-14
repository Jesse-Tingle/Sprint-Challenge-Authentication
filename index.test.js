const supertest = require("supertest");
const server = require("./api/server.js");
const db = require("./database/dbConfig.js");
const { authenticate } = require("./auth/authenticate-middleware.js");

beforeAll(async () => {
	return (
		await db.migrate.rollback(), await db.migrate.latest(), await db.seed.run()
	);
});
afterAll(async () => {
	return await db.migrate.rollback();
});

test("register route", async () => {
	const res = await supertest(server)
		.post("/api/auth/register")
		.send({ username: "testUser", password: "12Ob67b6nt5" });
	expect(res.statusCode).toBe(201);
	expect(res.type).toBe("application/json");
	expect(res.body.username).toBe("testUser");
});

test("login route", async () => {
	const res = await supertest(server)
		.post("/api/auth/login")
		.send({ username: "testUser", password: "12Ob67b6nt5" });
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
	expect(res.body.message).toBe("Welcome testUser!");
});

test("jokes route", async () => {
	const fakeServer = supertest(server);
	await fakeServer
		.post("/api/auth/login")
		.send({ username: "testUser", password: "12Ob67b6nt5" });
	const res = await fakeServer.get("/api/jokes");
	expect(res.statusCode).toBe(200);
	expect(res.type).toBe("application/json");
});

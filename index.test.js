const supertest = require("supertest");
const server = require("./api/server.js");

test("register route", async () => {
	const res = await supertest(server)
		.post("/api/auth/register")
		.send({ username: "testUser", password: "12Ob67b6nt5" });
	expect(res.statusCode).toBe(201);
	expect(res.type).toBe("application/json");
	expect(res.body.username).toBe("testUser");
});

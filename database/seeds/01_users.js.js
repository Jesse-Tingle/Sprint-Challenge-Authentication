exports.seed = async function(knex) {
	await knex("users").insert([
		{
			username: "testy tester",
			password: "12345678abcdefg"
		},
		{
			username: "testy tester tested",
			password: "12345678abcdef"
		}
	]);
};

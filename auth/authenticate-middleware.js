const sessions = {};

function authenticate() {
	const authError = {
		message: "You shall not pass!"
	};
	return async (req, res, next) => {
		try {
			if (!req.session || !req.session.user) {
				return res.status(401).json(authError);
			}

			next();
		} catch (error) {
			next(error);
		}
	};
}

module.exports = {
	sessions,
	authenticate
};

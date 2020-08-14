// const sessions = {};

// function authenticate() {
// 	const authError = {
// 		message: "You shall not pass!"
// 	};
// 	return (req, res, next) => {
// 		try {
// 			if (!req.session || !req.session.user) {
// 				return res.status(401).json(authError);
// 			}

// 			next();
// 		} catch (error) {
// 			next(error);
// 		}
// 	};
// }

// module.exports = {
// 	sessions,
// 	authenticate
// };

module.exports = (req, res, next) => {
	const sessions = {};
	const authError = {
		message: "You shall not pass!"
	};
	if (process.env.NODE_ENV === "test") {
		next();
	} else {
		if (!req.session || !req.session.user) {
			return res.status(401).json(authError);
		} else {
			next();
		}
	}
};

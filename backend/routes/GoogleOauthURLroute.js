const getGoogleOauthUrl = require("../Utils/GetGoogleOauthUrl");

const getGoogleOauthUrlRoute = {
    path: "/auth/google/url",
    method: "get",
    handler: (_req, res) => {
        const url = getGoogleOauthUrl();
        res.status(200).json({ url });
    },
};

module.exports = getGoogleOauthUrlRoute;

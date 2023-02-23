const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/discord/get/user/",
    method: "get",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpGet[REPL URI/api/discord/get/user?user=$authorID]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { user } = req.query;
        if(!user) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Missing the user id query."
                }
            })
        }

        let u = apisBuilder.client.users.cache.get(user);
        if(!u) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Invalid user query."
                }
            })
        }

        u.flags = u.flags.toArray();
        return res.status(200).json({
            error: false,
            code: 200,
            data: {
                message: "Correctly fetched user data.",
                user: u
            }
        })
    }
}
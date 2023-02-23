const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/discord/get/member/",
    method: "get",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpGet[REPL URI/api/discord/get/member?guild=$guildID&user=$authorID]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { user, guild } = req.query;
        if(!user) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Missing the user id query."
                }
            })
        }

        if(!guild) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Missing the user id query."
                }
            })
        }

        let g = apisBuilder.client.guilds.cache.get(guild);
        if(!g) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Invalid guild query."
                }
            })
        }

        let u = g.members.cache.get(user);
        if(!u) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "Invalid user query."
                }
            })
        }

        delete u.user;
        return res.status(200).json({
            error: false,
            code: 200,
            data: {
                message: "Correctly fetched member data.",
                member: u
            }
        })
    }
}
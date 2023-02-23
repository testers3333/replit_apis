const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/database/set/member/:member/:guild",
    method: "post",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpPost[REPL URI/api/database/set/member/$authorID/$guildID;{
     *   "name": "test",
     *   "value": "value of test"
     * }]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { name, value } = req.body;
        let member = req.params.member;
        let guild = req.params.guild;
        if(!name) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "You missed to put the variable name in your post request body."
                }
            })
        }
        if(typeof name !== "string") {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "You need to put a string as the variable name in your post request body."
                }
            })
        }
        if(!value) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "You missed to put the variable value in your post request body."
                }
            })
        }
        if(!typeof value in ["boolean", "string", "number", "bigint", "object", "symbol"] && !Array.isArray(value)) {
            return res.status(402).json({
                error: true,
                code: 402,
                data: {
                    message: "You need to put a valid variable value in your post request body."
                }
            })
        }

        let old = await apisBuilder.db.get(name+"_"+member+"_"+guild);
        apisBuilder.db.set(name+"_"+member+"_"+guild, value);
        return res.status(200).json({
            error: false,
            status: 200,
            data: {
                message: "Correctly updated the member variable " + name + " value.",
                values: {
                    old: old,
                    new: value
                }
            }
        });
    }
}
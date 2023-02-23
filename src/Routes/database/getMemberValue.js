const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/database/get/member/:member/:guild",
    method: "get",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpGet[REPL URI/api/database/set/member/$authorID/$guildID?name=test]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { name } = req.body;
        let member = req.params.member;
        let guild = req.params.guild;
        let user = req.params.user
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

        let value = await apisBuilder.db.get(name+"_"+member+"_"+guild);
        return res.status(200).json({
            error: false,
            status: 200,
            data: {
                message: "Correctly updated the member variable " + name + " value.",
                value: value
            }
        });
    }
}
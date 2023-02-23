const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/database/get/channel/:channel",
    method: "get",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpGet[REPL URI/api/database/get/channel/$channelID?name=test]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { name } = req.query;
        let channel = req.params.channel;
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

        let value = await apisBuilder.db.get(name+"_"+channel);
        return res.status(200).json({
            error: false,
            status: 200,
            data: {
                message: "Correctly fetched the channel variable " + name + ".",
                value: value
            }
        });
    }
}
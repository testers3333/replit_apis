const express = require("express");
const ApisBuilder = require("../../Main");

module.exports = {
    path: "/api/database/get/global/",
    method: "get",
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {ApisBuilder} apisBuilder 
     * @example
     * $httpGet[REPL URI/api/database/get/global?name=test]
     * 
     * $if[$httpResult[error]]
     *     An error occured.
     *     $stop
     * $endif
     */
    async run (req, res, apisBuilder) {
        let { name } = req.query;
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

        let value = await apisBuilder.db.get(name);
        return res.status(200).json({
            error: false,
            status: 200,
            data: {
                message: "Correctly fetched the global variable " + name + ".",
                value: value
            }
        });
    }
}
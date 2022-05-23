"use strict"

const express = require("express");
const morgan = require("morgan");

const {
    getAllOpcodes,
    getOpcodesByParams,
} = require('./opcodeHandlers');

const {
    getAllViews,
    createView,
    deleteView
} = require('./viewHandlers');

const PORT = 4000;

express()
    .use(function (req, res, next) {
        res.header(
        "Access-Control-Allow-Methods",
        "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))

    // ENDPOINTS
    .get("/opcodes", getAllOpcodes)
    .post("/opcodes", getOpcodesByParams)
    .get("/views", getAllViews)
    .put("/views", createView)
    .delete("/views", deleteView)

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
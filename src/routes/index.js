const express = require("express");
const router  = express.Router();

const mysql = require('promise-mysql');

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json();

const axios = require('axios');
const fortysixElks = require('fortysix-elks');
let fc = new fortysixElks.Client('u04f5edd8e3c7288458393e2a6893b04c', '0A0192CFEAB6FBA0D18A8EBCD3236CF6');

const config = require('../../config/warehouse_db.json');
let db;


(async function() {
    db = await mysql.createConnection(config);

    process.on("exit", () => {
        db.end();
    });
})();

router.get("/", (req, res) => {
    res.send("Hello world!");
});

router.get("/camera", async (req, res) => {
    let sql = `SELECT * FROM Camera`;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);
        console.log(sqlResult);

        res.send(sqlResult);
    } catch (error) {
        console.log("Error in /camera", error);
    }
});

router.get("/vehicles", async (req, res) => {
    let sql = `SELECT * FROM Vehicles`;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);
        console.log(sqlResult);

        res.send(sqlResult);
    } catch (error) {
        console.log("Error in /vehicles", error);
    }
});

router.post("/vehicles", urlencodedParser, async (req, res) => {
    let {
        name,
        description
    } = req.body;

    console.log(req);

    let sql = `
    INSERT INTO Vehicles
        (name, description)
    VALUES
        (${mysql.escape(name)}, 
        ${mysql.escape(description)})
    `;

    let sqlResult;

    try {
        sqlResult = await db.query(sql);

        res.send("Created");
    } catch(error) {
        console.log("Error in POST /vehicle", error);
    }
});

router.post("/vehicles/remove", urlencodedParser, async (req, res) => {
    let {
        deleteList
    } = req.body;

    console.log("DeleteList: ", deleteList);

    for(let i = 0; i < deleteList.length; i++) {

    let sql = `
    DELETE 
        FROM Vehicles
        WHERE vehicle_id = ${mysql.escape(deleteList[i].vehicle_id)};
    `;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);

        res.send("Deleted");
    } catch(error) {
        console.log("Error in POST /vehicles/remove", error);
    }
    }
});

router.post("/camera", urlencodedParser, async (req, res) => {
    let {
        name,
        camera_url,
        description
    } = req.body;

    console.log(req);

    let sql = `
    INSERT INTO Camera
        (name, camera_url, description)
    VALUES
        (${mysql.escape(name)}, 
        ${mysql.escape(camera_url)}, 
        ${mysql.escape(description)})
    `;

    let sqlResult;

    try {
        sqlResult = await db.query(sql);

        res.send("Created");
    } catch(error) {
        console.log("Error in POST /camera", error);
    }
});

router.post("/camera/remove", urlencodedParser, async (req, res) => {
    let {
        deleteList
    } = req.body;

    console.log("DeleteList: ", deleteList);

    for(let i = 0; i < deleteList.length; i++) {

    let sql = `
    DELETE 
        FROM Camera
        WHERE camera_id = ${mysql.escape(deleteList[i].camera_id)};
    `;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);

        res.send("Deleted");
    } catch(error) {
        console.log("Error in POST /camera/remove", error);
    }
    }
});

router.post("/notifications", urlencodedParser, async (req, res) => {
    let {
        phone_number
    } = req.body;

    console.log(phone_number);

    let sql = `
    INSERT INTO Notifications 
        (phone_number)
    VALUES
        (${mysql.escape(phone_number)})
    `;

    let sqlResult;

    try {
        sqlResult = await db.query(sql);

        res.send("Created");
    } catch(error) {
        console.log("Error in POST /notifications", error);
    }
});

router.post("/notifications/remove", urlencodedParser, async (req, res) => {

    const {
        deleteList
    } = req.body;

    for(let i = 0; i < deleteList.length; i++) {
        let sql = `
        DELETE 
            FROM Notifications
            WHERE receiptant_id = ${mysql.escape(deleteList[i])};
        `
        try {
            sqlResult = await db.query(sql);
            console.log(sqlResult);
            res.send("Deleted");
        } catch(error) {
            console.log("Error in POST /notifications/remove", error);
        }
    }
});

router.get("/notifications", async (req, res) => {
    let sql = `SELECT * FROM Notifications`;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);
        console.log(sqlResult);

        res.send(sqlResult);
    } catch (error) {
        console.log("Error in /notifications", error);
    }
});

router.post("/notifications/event", async (req, res) => {

    let sql = `SELECT * FROM Notifications`;
    let sqlResult;

    try {
        sqlResult = await db.query(sql);
        console.log(sqlResult);

        for(let i = 0; i < sqlResult.length; i++) {
            if(sqlResult[i].phone_number.charAt(0) === '0')
                sqlResult[i].phone_number = sqlResult[i].phone_number.substr(1);

            fc.sendSMS('Godseye', '+46' + sqlResult[i].phone_number, 'Important event has happened in the warehouse! Please log onto the Godseye platform.', function(err, res) {
                console.log(err);
                console.log(res);
            });
        };

        res.send('Event sent');
    } catch (error) {
        console.log("Error in /notifications", error);
    }

})

module.exports = router;
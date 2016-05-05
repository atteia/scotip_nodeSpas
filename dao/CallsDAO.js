"use strict";

var db = require('../middleware/db');

function CallDAO() {
};
CallDAO.prototype = (function () {

    return {
        find: function find(id, callback) {
            var values = [
                id
            ];

            var sql = 'SELECT * FROM switchboard AS c ' +
                'WHERE c.sid = ?';

            db.query({
                sql: sql,
                values: values,
                callback: callback
            });
        },

        registerNewCall: function registerNewCall(switchboard_id, call, callback) {
            var values = [
                switchboard_id,
                call.callerid,
                call.timestamp
            ];

            var sql = 'INSERT INTO call_logs (switchboard_id, caller_number, timestamp)' +
                ' VALUES(?, ?, ?)';

            db.query({
                sql: sql,
                values: values,
                callback: function (err, result) {
                    if (err) throw err;
                    callback(result.insertId);
                }
            })

        }
    };
})();

var callDAO = new CallDAO();
module.exports = callDAO;
/*
 * Copyright (c) 2016. Pierre BOURGEOIS
 *
 *  Permission is hereby granted, free of charge, to any person
 *  obtaining a copy of this software and associated documentation
 *  files (the "Software"), to deal in the Software without restriction,
 *  including without limitation the rights to use, copy, modify, merge,
 *  publish, distribute, sublicense, and/or sell copies of the Software, and
 *  to permit persons to whom the Software is furnished to do so, subject
 *  to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

// Tasks routes
var Joi = require('joi');
var OperatorController = require('../controllers/Operators');

exports.register = function (server, options, next) {
    // Setup the controller
    var operatorController = new OperatorController(options.database);

    // Binds all methods
    // similar to doing `tasksController.index.bind(tasksController);`
    // when declaring handlers
    server.bind(operatorController);

    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/operators/{companyId}',
            config: {
                handler: operatorController.reloadOperators,
                validate: {
                    params: {
                        companyId: Joi.string().regex(/[0-9]+/)
                    }
                }
            }
        }]);

    next();
}

exports.register.attributes = {
    name: 'routes-operators',
    version: '1.0.1'
};

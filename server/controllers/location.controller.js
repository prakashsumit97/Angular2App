var config = require('config.json');
var express = require('express');
var router = express.Router();
var locationService = require('services/location.service');

// routes
router.post('/saveLocation', saveLocation);
router.get('/allLocation/:id', allLocation);
// router.post('/register', register);
// router.get('/', getAll);
// router.get('/current', getCurrent);
// router.put('/:_id', update);
// router.delete('/:_id', _delete);

module.exports = router;

// function saveLocation(req, res) {
//     console.log(req.body);
//     userService.authenticate(req.body.username, req.body.password)
//         .then(function(user) {
//             if (user) {
//                 // authentication successful
//                 res.send(user);
//             } else {
//                 // authentication failed
//                 res.status(401).send('Username or password is incorrect');
//             }
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }

function saveLocation(req, res) {
    locationService.saveLocation(req.body)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function allLocation(req, res) {
    locationService.allLocation(req.params.id)
        .then(function(location) {
            res.send(location);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

// function getCurrent(req, res) {
//     userService.getById(req.user.sub)
//         .then(function(user) {
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }

// function update(req, res) {
//     userService.update(req.params._id, req.body)
//         .then(function() {
//             res.sendStatus(200);
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }

// function _delete(req, res) {
//     userService.delete(req.params._id)
//         .then(function() {
//             res.sendStatus(200);
//         })
//         .catch(function(err) {
//             res.status(400).send(err);
//         });
// }
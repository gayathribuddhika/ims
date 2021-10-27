const express = require("express")
const mongoose = require("mongoose");
const router = express.Router()
const cors = require("cors")

const {User, validate} = require("../models/user.model")
router.use(cors())

const upload = require("../middleware/upload")

router.get('/user', (req, res) => {
    User.find({}, function (err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
});

// router.get('/user/admin', (req, res) => {
//     User.findOne({username: "Admin"}, function (err, user) {
//         if (err) {
//             res.json(err);
//         }
//         res.json(user);
//     });
// });

// router.get('/user/staff', (req, res) => {
//     User.findOne({username: "staff"}, function (err, user) {
//         if (err) {
//             res.json(err);
//         }
//         res.json(user);
//     });
// });

router.get('/user/:id', function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
        // let user1 = new User ({
        //     name: user.name,
        //     email: user.email
        // })
        // res.json(user1);
    });
});

router.post('/user', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send("User already registered");
    }
    user = new User({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
    })
    // if(req.file) {
    //     user.profile_image = req.file.path
    // }
    await user.save()
        .then(() => {
            res.status(200).send({msg:'User Added Successfully', user});
            
        })
})

module.exports = router;
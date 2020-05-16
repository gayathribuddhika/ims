const express = require("express")
const router = express.Router()
const cors = require("cors")

const Item = require("../models/lab1_item")
router.use(cors())

router.get('/lab1', (req, res) => {
    Item.find(function (err, items) {
        if (err) {
            res.json(err);
        }
        res.json(items);
    });
});

router.get('/lab1/:id', function (req, res) {
    let id = req.params.id;
    Item.findById(id, function (err, item) {
        if (err) {
            res.json(err);
        }
        res.json(item);
    });
});

/*router.post('/lab1', function (req, res) {
    let item = new Item(req.body);
    item.save()
        .then(() => {
            res.status(200).send('Record is saved Successfully');
        })
        .catch(() => {
            res.status(400).send("Unable to save to database");
        });
});*/

router.post('/lab1', function (req, res) {
    let item = new Item({
        Select_LAB:req.body.Select_LAB,
        Item_id:req.body.Item_id,
        Main_Category: req.body.Main_Category,
        Asset_Description: req.body.Asset_Description,
        Serial_Num: req.body.Serial_Num,
        Asset_Code: req.body.Asset_Code,
        Qty: req.body.Qty,
        Make: req.body.Make,
        Condition: req.body.Condition,
        Comments: req.body.Comments
    });
    item.save()
        .then(() => {
            res.status(200).send('Record is saved Successfully');
        })
        .catch(() => {
            res.status(400).send("Unable to save to database");
        });
});

/*router.post('/lab1', function(req, res) {             //this also working properly...
    Item.create(req.body).then(function (item){
        res.send(item);
    });
})*/

router.delete('/lab1/delete/:id', function (req, res) {               //can also use findByIdAndRemove
    Item.findOneAndDelete({ _id: req.params.id }, function (err) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

router.get('/lab1/edit/:id', function (req, res) {
    let id = req.params.id;
    Item.findById(id, function (err, item) {
        if (err) {
            res.json(err);
        }
        res.json(item);
    });
});

/*router.post('/lab1/update/:id', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (!item)
            res.status(404).send("Record is not found");
        else {
            item.Select_LAB = req.body.Select_LAB;
            item.Main_Category = req.body.Main_Category;
            item.Asset_Description = req.body.Asset_Description;
            item.Serial_Num = req.body.Serial_Num;
            item.Asset_Code = req.body.Asset_Code;
            item.Qty = req.body.Qty;
            item.Make = req.body.Make;
            item.Condition = req.body.Condition;
            item.Comments = req.body.Comments;
            item.save().then(() => {
                res.json('Update is Completed');
            })
                .catch(() => {
                    res.status(400).send("Unable to update the DB");
                });
        }
    });
});*/
router.put('/lab1/update/:id', function(req, res) {
    Item.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Item.findOne({_id:req.params.id}).then (function(item){
        res.send(item);
        })
    });
});

/*router.route('/lab1/update/:id').post((req, res, next) => {
    Item.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data)
        console.log('Student successfully updated!')
      }
    })
  })*/

module.exports = router;

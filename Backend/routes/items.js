const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const url = 'mongodb://localhost:27017/Inventory_FAS';


router.get('/', async(req, res) => {
    const records = await loadRecordscollection();
    res.send(await records.find({}).toArray());
});

router.post('/', async (req, res) => {
    const records = await loadRecordscollection();
    await records.insertOne({
        Id: req.body.id,
        Main_Category: req.body.Main_Category,
        Asset_Description: req.body.Asset_Description,
        Asset_Code: req.body.Asset_Code,
        Qty: req.body.Qty,
        Make: req.body.Make,
        Condition: req.body.Condition,
        Comments: req.body.Comments
    });
    
    res.status(201).send();
});

/*router.delete('/:id', async(req, res) => {
    const records = await loadRecordscollection();
    await records.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});
*/
router.delete('/:id', function(req, res, next) {
    records.delete(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


async function loadRecordscollection() {
    const client = await mongodb.MongoClient.connect (url, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db('Inventory_FAS').collection("CIS/LAB/01")
}





module.exports = router;
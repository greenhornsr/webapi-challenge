const express = require('express');
const db = require('../../data/helpers/actionModel');

const router = express.Router();
router.use(express.json());



router.get('/', (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json({ success: true, message: "Got em!", actions })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ success: false, message: "ewww, no such luck.  No Actions Found!", err })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.get(id)
    .then(action => {
        if (action){
            res.status(200).json({ success: true, message: "Got one!", action })
        }else{
            console.log(err)
            res.status(400).json({ success: false, message: "ewww, no such luck.  No Action Found!", err })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: "we got nothing for ya!", err })
    })
})

router.post('/', (req, res) => {
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})




module.exports = router;

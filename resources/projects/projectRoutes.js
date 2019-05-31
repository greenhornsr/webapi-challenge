const express = require('express');
const db = require('../../data/helpers/projectModel');

const router = express.Router();
router.use(express.json());



router.get('/', (req, res) => {
    db.get()
    .then(projects => {
        res.status(200).json({ success: true, message: "Got em!", projects })
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({ success: false, message: "ewww, no such luck.  No Actions!", err })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.get(id)
    .then(project => {
        if (project){
            res.status(200).json({ success: true, message: "Got one!", project })
        }else{
            console.log(err)
            res.status(400).json({ success: false, message: "ewww, no such luck.  No Action Found!", err })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: "we got dem server issues!", err })
    })
})

router.post('/', (req, res) => {
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})




module.exports = router;

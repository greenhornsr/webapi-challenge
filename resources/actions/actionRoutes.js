const express = require('express');
const db = require('../../data/helpers/actionModel');
const pdb = require('../../data/helpers/projectModel');


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

router.post('/', validateAction, validateProject_Id, (req, res) => {
    const newaction = req.body;
    db.insert(newaction)
    .then(action => {
        res.status(201).json({ success: true, message: `${newaction.description} was added successfully!`, action })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: 'server error', err})
    })
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

// Middleware
function validateAction(req, res, next) {
    // console.log('im in validateUser')
    if(!req.body.description){
        res.status(400).json({ message: 'Missing required description field' })
    }else if(!req.body.notes){
        res.status(400).json({ message: 'Missing required notes field' })
    }else if(!req.body.project_id){
        res.status(400).json({ message: 'Missing required project_id field' })
    }else{
        next();
    }
};


function validateProject_Id(req, res, next) {
    // console.log(req.params)
    pdb.get(req.params.project_id)
    .then(p_id => {
        if(p_id){ 
        next()
        }else{
            res.status(400).json({ message: 'Invalid project_id!' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'unknown server error validating id', err })
    })
} 


module.exports = router;

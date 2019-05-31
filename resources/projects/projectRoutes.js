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

router.post('/', validateProject, (req, res) => {
    const newproject = req.body;
    db.insert(newproject)
    .then(project => {
        res.status(201).json({ success: true, message: `${newproject.name} was added successfully!`, project })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: 'server error', err})
    })
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    const changes = req.body
    db.update(id, changes)
    .then(updated => {
        if(updated){
            res.status(200).json({ success: true, message: `${updated} completed successfully!`, updated })
        }else{
            res.status(404).json({ success: false, message: 'no project found' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: 'no such luck', err })
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    db.remove(id)
    .then(deleted => {
        if(deleted) {
            // console.log(deleted)
            res.status(204).end()
            // res.status(204).json({ success: true, message: `action ${id} deleted successfully`, deleted })
        } else {
            res.status(404).json({ success: false, message: "The action with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ success: false, message: "The action could not be removed", err })
    })
})

// Middleware
function validateProject(req, res, next) {
    // console.log('im in validateUser')
    if(!req.body.description){
        res.status(400).json({ message: 'Missing required description field' })
    }else if(!req.body.name){
        res.status(400).json({ message: 'Missing required name field' })
    }else{
        next();
    }
};


function validateProjectId(req, res, next) {
    if(req.params && req.params.id) {
        // console.log(req.params)
        const idfound = db.get(req.params.id)
        .then(action => {
            if(idfound){
            req.action = action 
            next()
            }else{
                res.status(400).json({ message: 'Invalid project id!' })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'unknown server error validating id', err })
        })
    }
} 



module.exports = router;

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {

  knex
    .select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .first()
    .where('id',id)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const reqObj = req.body;

  if (!reqObj.name) {
    const err = new Error('Missing name, folder must have a name');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .where('id', id)
    .update(reqObj)
    .returning('name')
    .then(([results]) => {
      if(!results){
        next();
      } else {
        res.json(results);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const newFolder = req.body;

  if(!newFolder.name){
    const err = new Error('Folder must have a name');
    err.status = 400;
    next(err);
  }

  knex('folders')
    .insert(newFolder)
    .returning('name')
    .then(([result]) => {
      if(!result){
        res.sendStatus(500);
      } else {
        res.location(`http://${req.headers.host}/folders/${result.id}`).status(201).json(result);
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where('id', id)
    .del()
    .then( () => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
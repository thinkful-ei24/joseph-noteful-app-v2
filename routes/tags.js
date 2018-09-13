'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('tags')
    .select('id','name')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tags')
    .select('id', 'name')
    .where('id', id)
    .then( results => {
      res.json(results);
    })
    .catch(err => {next(err)});
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const updateObj = req.body;

  if (!updateObj.name){
    const err = new Error('Must provide a name');
    err.status = 400;
    next(err);
  }

  knex('tags')
    .where('id', id)
    .update(updateObj)
    .returning('id','name')
    .then(([results]) => {
      res.json(results);
    })
    .catch(err => { next(err); });

});

router.post('/', (req, res, next) => {
  const { name } = req.body;

  if (!name){
    const err = new Error('Name must be provided');
    err.status = 400;
    return next(err);
  }

  knex.insert({name})
    .into('tags')
    .returning(['id', 'name'])
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });

});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tags')
    .where('id', id)
    .del()
    .then( () => {
      res.sendStatus(204);
    })
    .catch(err => {next(err);});
});

module.exports = router;
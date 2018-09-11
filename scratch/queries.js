'use strict';

// const knex = require('../knex');

// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });
// let id = 1002;
// knex
//   .select()
//   .from('notes')
//   .where('id', id)
//   .then(results => console.log(JSON.stringify(results[0])));

// let id = 1002;
// let updateObj = {title: 'knex update', content: 'did it update?' };
// knex('notes')
//   .where('id', id)
//   .update(updateObj)
//   .returning('*')
//   .then(results => console.log(JSON.stringify(results)));

// let newItem = {title: 'knex create', content: 'did it create?' };
// knex('notes')
//   .insert(newItem)
//   .returning('*')
//   .then(results => console.log(JSON.stringify(results)[0]));
// let del_id = 1003;
// knex('notes')
//   .where('id', del_id)
//   .del()
//   .then(result => console.log(JSON.stringify(result)));

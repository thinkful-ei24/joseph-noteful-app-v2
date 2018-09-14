'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../knex');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Static Server', function() {
  it('GET request "/" should return the index page', function() {
    return chai
      .request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });
});

describe('Noteful API', function() {
  const seedData = require('../db/seedData');

  beforeEach(function() {
    return seedData('./db/noteful.sql');
  });

  after(function() {
    return knex.destroy(); // destroy the connection
  });

  describe('GET /api/notes', function() {
    it('should return the default of 10 Notes ', function() {
      return chai
        .request(app)
        .get('/api/notes')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
        });
    });

    it('should return correct search results for a valid searchTerm', function() {
      return chai
        .request(app)
        .get('/api/notes?searchTerm=about%20cats')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(4);
          expect(res.body[0]).to.be.an('object');
        });
    });
  });

  describe('404 handler', function() {
    it('should respond with 404 when given a bad path', function() {
      return chai
        .request(app)
        .get('/api/notelydoo')
        .then(function(res) {
          expect(res).to.have.status(404);
        });
    });
  });

  describe('GET /api/notes', function() {
    it('should return an array of objects where each item contains id, title, and content', function() {
      return chai
        .request(app)
        .get('/api/notes')
        .then(function(res) {
          const expectedKeys = [
            'id',
            'title',
            'content',
            'folderId',
            'folderName',
            'tags'
          ];
          res.body.forEach(function(obj) {
            expect(obj).to.have.keys(expectedKeys);
          });
        });
    });

    it('should return an empty array for an incorrect searchTerm', function() {
      return chai
        .request(app)
        .get('/api/notes?searchTerm=flagasdfsd')
        .then(function(res) {
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(0);
        });
    });
  });

  describe('GET /api/notes/:id', function() {
    it('should return correct note when given an id', function() {
      return chai
        .request(app)
        .get('/api/notes/1')
        .then(function(res) {
          const expectedResult = {
            id: 1,
            title: '5 life lessons learned from cats',
            content: 'intial content lorem ipsum',
            folderId: 1,
            folderName: 'Archive',
            tags: [
              {
                id: 1,
                name: 'stuff'
              },
              {
                id: 2,
                name: 'yay'
              }
            ]
          };
          expect(res.body).to.eql(expectedResult);
        });
    });

    it('should respond with a 404 for an invalid id', function() {
      return chai
        .request(app)
        .get('/api/notes/10000000')
        .then(function(res) {
          expect(res).to.have.status(404);
        });
    });
  });

  describe('POST /api/notes', function() {
    it('should create and return a new item when provided valid data', function() {
      return chai
        .request(app)
        .post('/api/notes')
        .send({
          title: 'testing post with mocha chai',
          content: 'intial content lorem ipsum',
          folderId: 1,
          tags: [1, 2]
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res.body).to.eql({
            content: 'intial content lorem ipsum',
            folderId: 1,
            folderName: 'Archive',
            id: 100,
            tags: [
              {
                id: 1,
                name: 'stuff'
              },
              {
                id: 2,
                name: 'yay'
              }
            ],
            title: 'testing post with mocha chai'
          });
        });
    });

    it('should return an error when missing "title" field', function() {
      return chai
        .request(app)
        .post('/api/notes')
        .send({
          title: '',
          content: 'some test content'
        })
        .then(function(res) {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Missing `title` in request body');
        });
    });
  });

  describe('PUT /api/notes/:id', function() {
    it('should update the note', function() {
      return chai
        .request(app)
        .put('/api/notes/2')
        .send({
          title: 'update mocha chai',
          content: 'an updated note via test suite'
        })
        .then(function(res) {
          expect(res.body).to.eql({
            id: 2,
            title: 'update mocha chai',
            folderId: null,
            content: 'an updated note via test suite',
            tags: []
          });
        });
    });

    it('should respond with a 404 for an invalid id', function() {
      return chai
        .request(app)
        .put('/api/notes/1000000')
        .send({ title: 'should 404', content: 'sadfasdf' })
        .then(function(res) {
          expect(res).to.have.status(404);
        });
    });

    it('should return an error when missing "title" field', function() {
      return chai
        .request(app)
        .put('/api/notes/3')
        .send({ content: 'asdfasdf' })
        .then(function(res) {
          expect(res.body.message).to.equal('Missing `title` in request body');
        });
    });
  });

  describe('DELETE  /api/notes/:id', function() {
    it('should delete an item by id', function() {
      return chai
        .request(app)
        .delete('/api/notes/3')
        .then(function(res) {
          expect(res).to.have.status(204);
        });
    });
  });
});

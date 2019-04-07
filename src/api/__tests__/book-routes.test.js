'use strict';

const { server } = require('../../server.js');
const supertest = require('supertest');
const request = supertest(server);

describe('Book Routes', () => {
  describe('`GET` `/` route', () => {
    it('should return status `200` on a good request', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });

  describe('`GET` `/books` route', () => {
    it('should return status `200` on a good request', async () => {
      const response = await request.get('/books');
      expect(response.status).toBe(200);
    });
  });

  describe('`GET` `/books/:id` route', () => {
    it('should return status `200` on a good request', async () => {
      const id = 1;
      const response = await request.get(`/books/${id}`);
      expect(response.status).toBe(200);
    });
  });

  describe('`POST` `/books` route', () => {
    it('should return status `200` on a good request', async () => {
      const response = await request.post(`/books`);
      expect(response.status).toBe(200);
    });
  });

  describe('`PUT` `/books/:id` route', () => {
    it('should return status `200` on a good request', async () => {
      const id = 1;
      const response = await request.put(`/books/${id}`);
      expect(response.status).toBe(200);
    });
  });

  describe('`PATCH` `/books/:id` route', () => {
    it('should return status `200` on a good request', async () => {
      const id = 1;
      const response = await request.patch(`/books/${id}`);
      expect(response.status).toBe(200);
    });
  });

  describe('`DELETE` `/books/:id` route', () => {
    it('should return status `200` on a good request', async () => {
      const id = 1;
      const response = await request.delete(`/books/${id}`);
      expect(response.status).toBe(200);
    });
  });
});

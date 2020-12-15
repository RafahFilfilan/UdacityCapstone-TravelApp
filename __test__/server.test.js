import { describe, expect } from "@jest/globals"

const request = require('supertest')
const app = require('../src/server/server')
  
  
describe("Testing root path", () => {
    test("Testing the GET method", done => {
		request(app)
		  .get("/")
		  .then(response => {
			  expect(response.statusCode).toBe(200);
			  done()
		  });
	})
});
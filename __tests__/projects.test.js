const request = require('supertest');
const app = require('../server/server');

let server = 'https://reactype.herokuapp.com';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  // server = 'http://localhost:5000';
  server = require('..server/server');
}

// save and get projects endpoint testing
describe('Project endpoints tests', () => {  
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    Mongoose.disconnect();
    server.close(done);
  });

  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', () => {
        return request(server)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
          .then(res => expect(res.body.project.name).toBe('test'));
      });
    });
  });

  // test getProjects endpoint
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => {
        return request(server)
          .post('/getProjects')
          .set('Accept', 'application/json')
          .send({ userId: projectToSave.userId })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(Array.isArray(res.body)).toBeTruthy;
            expect(res.body[0].name).toBe(state.name);
          });
      });
    });
  });

  // test deleteProject endpoint
  describe('/deleteProject', () => {
    describe('DELETE', () => {
      const { name, userId } = projectToSave;
      it('responds with status of 200 and json object equal to deleted project', () => {
        return request(server)
          .delete('/deleteProject')
          .set('Accept', 'application/json')
          .send({ name, userId })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => expect(res.body.name).toBe('test'));
      });
    });
  });
});

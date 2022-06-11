/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../src/server.js';

// Testando com JEST = https://jestjs.io/pt-BR/docs/expect
describe('APP testes', () => {
  it('some test', (done) => {
    const foo = 'bar';
    expect(foo).toEqual('bar');
    expect(foo).toHaveLength(3);
    import('../src/index.js');
    request(app)
      .get('/healthcheck')
      .then(({ text }) => {
        expect(text).toEqual('OK');
        done();
      })
      .catch(done);
  });
});

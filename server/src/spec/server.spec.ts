import axios from "axios";

var base_url = "http://localhost:3000";

describe("O servidor", () => {

  let server: any = null;
  let token: any = null;

  beforeAll(async () => {
    let app = require('../index')
    server = await app
    await axios.post(`${base_url}/register`, { username: 'admin', password: '123456'})
    token = (await axios.post(`${base_url}/api/login`, { username: 'admin', password: '123456'})).data.token
  });

  afterAll(() => {
    server.close();
  });

  it('deveria iniciar', async () => {
      const res = await axios.get(base_url)
      await expect(res.data.status).toBe('ok')
  })

  it('cadastra usuários que logins ainda não cadastrados', async () => {
    const res = (await axios.post('/users/invite', { 
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { username: 'rma7' }
    })).data
    await expect(res).toBe({
      status: 'ok',
      message: "Invite succesfully sent to email rma7@cin.ufpe.br"
    })
  })

  it('deveria registrar e recuperar estudantes', async () => {
    try {
      const resPost = (await axios.post(`${base_url}/api/students`, { students: [{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam"}]}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data;
      
      await expect(resPost).toBe({
        status: 'ok',
        message: "Students successfully registered"
      })
      
      const res = (await axios.get(`${base_url}/api/students`)).data;
      expect(res).toBe([{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam"}]);
    } catch (err) {
      expect(err).toBe(null);
    }
  })

})

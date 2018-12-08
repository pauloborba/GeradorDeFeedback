import axios from "axios";

var base_url = "http://localhost:3000";

describe("O servidor", () => {

  let server: any = null;
  let token: any = null;

  beforeAll(async () => {
    let app = require('../index')
    server = await app
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
    try {
      const res = (await axios.post(`${base_url}/api/users/invite`,{ username: 'rma7' }, { 
        headers: {
          Authorization: `Bearer ${token}`
        },
      })).data
      await expect(res.status).toBe("ok")
      await expect(res.message).toBe("Invite succesfully sent to email rma7@cin.ufpe.br")
    } catch (err) {
      console.log(err)
      expect(err).toBeNull()
    }
  })

  it('não cadastra usuário que logins já estão cadastrados', async () => {

    const res = (await axios.post(`${base_url}/api/users/invite`,{ username: 'abc' }, { 
      headers: {
        Authorization: `Bearer ${token}`
      },
    })).data;

    const res2 = await axios.post(`${base_url}/api/users/invite`,{ username: 'abc' }, { 
        headers: {
          Authorization: `Bearer ${token}`
        },
    })
    .catch(err => {
        const { message, status } = err.response.data;
        expect(message).toBe('There is already a student registered with the login abc');
        expect(status).toBe('Failure')
      })
      
    const users = (await axios.get(`${base_url}/api/users`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }));
    const withLoginQuantity = users.data.filter(({ username }: any) => username == 'abc').length;
    await expect(withLoginQuantity).toBe(1);
  })

})

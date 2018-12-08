import axios from "axios";
import app from "../index";

var base_url = "http://localhost:3000";

describe("O servidor", () => {

  let server: any = null;
  let token: any = null;

  beforeAll(async () => {
    server = await app
    // const res1 = await axios.post(`${base_url}/register`, { username: 'admin', password: '123456'})
    // console.log(res1.data);
    const res = await axios.post(`${base_url}/api/login`, { username: 'admin', password: '123456'});
    token = res.data.token;
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
      const resPost = await axios.post(`${base_url}/api/students`, { students: [{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam"}]}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      await expect(resPost.data).toEqual({
        status: 'ok',
        message: "Students were registered successfully"
      })
      
      const res = await axios.get(`${base_url}/api/students`, { headers: {
        Authorization: `Bearer ${token}`
      }});
      expect(res.data.students).toContain(jasmine.objectContaining({theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam"}));
    } catch (err) {
      expect(err).toBe(null);
    }
  })

  it('deveria não registrar estudantes não participantes do grupo do the huxley', async () => {
    try {
      const resPost = (await axios.post(`${base_url}/api/students`, { students: [{theHuxleyName: "Joao", login: "j"}]}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data;
      
    } catch (err) {
      // console.log(err.message);
      expect(err.response.status).toBe(422);
    }

    const res = await axios.get(`${base_url}/api/students`, { headers: {
      Authorization: `Bearer ${token}`
    }});

    expect(res.data.students).not.toContain({theHuxleyName: "Joao", login: "j"});
  })
  
  it('deveria não registrar estudantes com login em branco', async () => {
    try {
      const resPost = (await axios.post(`${base_url}/api/students`, { students: [{theHuxleyName: "Rafael Mota Alves", login: ""}]}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).data;
      
    } catch (err) {
      // console.log(err.message);
      expect(err.response.status).toBe(422);
    }

    const res = await axios.get(`${base_url}/api/students`, { headers: {
      Authorization: `Bearer ${token}`
    }});

    expect(res.data.students).not.toContain({theHuxleyName: "Rafael Mota Alves", login: ""});
  })

})

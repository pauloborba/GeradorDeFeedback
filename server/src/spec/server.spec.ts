import axios from "axios";
import app from "../index";
import { IStudent } from "collections";

var base_url = "http://localhost:3000";

describe("O servidor", () => {

  let server: any = null;
  let token: any = null;
  
  async function registerStudents(students: IStudent[]){
    return axios.post(`${base_url}/api/students`, { students }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  };

  async function checkNotRegisterStudent(student: IStudent, code: number){
    try {
      const resPost = await registerStudents([student]);
      
    } catch (err) {
      // console.log(err.message);
      expect(err.response.status).toBe(code);
    }

    const res = await axios.get(`${base_url}/api/students`, { headers: {
      Authorization: `Bearer ${token}`
    }});

    expect(res.data.students).not.toContain(student);
  }

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
      const resPost = await registerStudents([{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam", submissions: []}]);
      
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
      await checkNotRegisterStudent({theHuxleyName: "Joao", login: "j", submissions: []}, 404);
    } catch (err) {
      // console.log(err.message);
      expect(err).toBe(null);
    }
  })
  
  it('deveria não registrar estudantes com login em branco', async () => {
    try {
      await checkNotRegisterStudent({theHuxleyName: "Rafael Mota Alves", login: "", submissions: []}, 422);
    } catch (err) {
      // console.log(err.message);
      expect(err).toBe(null);
    }
  })
  
  it('deveria não registrar estudantes com nome em branco', async () => {
    try {
      await checkNotRegisterStudent({theHuxleyName: "", login: "rma7", submissions: []}, 422);
    } catch (err) {
      // console.log(err.message);
      expect(err).toBe(null);
    }
  })

})

import axios from "axios";

var base_url = "http://localhost:3000";

describe("O servidor", () => {

  let server: any = null; 

  beforeAll(async () => {
    server = require('../index')
    server = await server
  });

  afterAll(() => {
    server.close();
  });

  it('deveria iniciar', async () => {
      const res = await axios.get(base_url)
      await expect(res.data.status).toBe('ok')
  })

})

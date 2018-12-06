import User from '../../models/User'
describe("A classe User", () => {

  it('deve criar um senha aleatória quando requisitado', () => {
    const testUser = new User({ username: "rma7", isAdmin: false, password: null })
    
    testUser.generateRandomPassword(5)
    expect(testUser.password.length).toBe(5)

    testUser.generateRandomPassword(8)
    expect(testUser.password.length).toBe(8)

    testUser.generateRandomPassword(1)
    expect(testUser.password.length).toBe(1)
    
    const oldPassword = testUser.password

    testUser.generateRandomPassword(0)
    expect(testUser.password).toBe(oldPassword)

  }) 
})
  
import UserRepository from '../../repositories/userRepository'
import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_NAME } from "../../util/secrets";
import User from '../../models/User'

describe("A classe UserRepository", () => {
    
    let db: Db = null;
    let mongo: MongoClient = null;

    beforeAll( async () => {
      mongo = await MongoClient.connect(MONGODB_URI,  { useNewUrlParser: true })
      db = mongo.db(MONGODB_NAME);
    });
  
    afterAll( async () => {
      //try { await db.dropCollection('users') } catch (e) {}
      mongo.close();
    });

    it('deve inserir um usuário no banco ao chamar o método insertOne', async () => {
      const userRepository = new UserRepository(db)

      await userRepository.insertOne({ username: 'rma7', password: '123456'}, true)
      const result = <User> await userRepository.findOne({ username: 'rma7'})
      expect(result.username).toEqual('rma7')
      await userRepository.deleteAccount(result._id)
    })
  
    it('deve inserir um usuario no banco com uma senha e retornar dados para um email ao chamar o método inviteUser', async () => {
      const userRepository = new UserRepository(db)
      const admin = new User({ username: 'admin', password: '123', isAdmin: true })
      
      const mailData = await userRepository.inviteUser({ username: 'rma7', password: '123456'}, admin)
      expect(mailData.to).toBe(`rma7@cin.ufpe.br`)

      const result = <User> await userRepository.findOne({ username: 'rma7'})
      expect(result.username).toEqual('rma7')
      await userRepository.deleteAccount(result._id)

    })
  })
  
import StudentRepository from "../../repositories/studentRepository";
import { MongoClient, Db } from "mongodb";
import { MONGODB_URI } from "../../util/secrets";
import { MONGODB_NAME } from "../../util/secrets";
import Student from "../../models/Student";
import { IStudent } from "collections";
import TheHuxleyService from "../../services/theHuxley";

describe("A classe studentRepository", () => {
    let studentRepository: StudentRepository;
    let db: Db;

    beforeAll(async () => {
      let mongo: MongoClient = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
      db = mongo.db(MONGODB_NAME);
      await db.collection("students").drop();  
      const theHuxleyService = new TheHuxleyService();
      theHuxleyService.login();
      studentRepository = new StudentRepository(db, theHuxleyService);  
    });
    
    it("deve registrar e resgatar estudantes", async () => {
      const insert = await studentRepository.insertMany([{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam", submissions: []}]);
      
      expect(insert.insertedCount).toBe(1);
      const get = await studentRepository.findAll({});
      
      expect(get.length).toBe(1);
    })

    it("não deve registrar uma lista de estudantes com estudantes não registrados no thehuxley", async () => {
      const student:IStudent = {theHuxleyName: "Teste", login: "t", submissions: []}
      try {
        const insert = await studentRepository.insertMany([student]);
        expect(insert.insertedCount).toBe(0);
      } catch (err) {
        const get = await studentRepository.findAll({});
        expect(get).not.toContain(jasmine.objectContaining(student));
      }
    })
    
    it("não deve registrar estudantes com login em branco", async () => {
      const student:IStudent = {theHuxleyName: "Rafael Mota Alves", login: "", submissions: []}
      try {
        const insert = await studentRepository.insertMany([student]);
        expect(insert.insertedCount).toBe(0);
      } catch (err) {
        const get = await studentRepository.findAll({});
        expect(get).not.toContain(jasmine.objectContaining(student));
      }
    })

  })
  
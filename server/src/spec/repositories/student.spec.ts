import StudentRepository from "../../repositories/studentRepository";
import { MongoClient, Db } from "mongodb";
import { MONGODB_URI } from "../../util/secrets";
import { MONGODB_NAME } from "../../util/secrets";

describe("A classe studentRepository", () => {
    let studentRepository: StudentRepository;
    let db: Db;

    beforeAll(async () => {
      let mongo: MongoClient = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true });
      db = mongo.db(MONGODB_NAME);
      studentRepository = new StudentRepository(db);  
    });
  
    afterAll(async () => {
      await db.dropCollection("students");
    });
    
    it("deve registrar e resgatar estudantes", async () => {
      const insert = await studentRepository.insertMany([{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam", submissions: []}]);
      expect(insert.insertedCount).toBe(1);
      const get = await studentRepository.findAll({});
      expect(get.length).toBe(1);
    })

  })
  
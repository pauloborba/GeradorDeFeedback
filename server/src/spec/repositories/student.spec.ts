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
      await db.collection("students").drop();  
      studentRepository = new StudentRepository(db);  
    });
  
    afterEach(async () => {
      await db.collection("students").drop();
    });
    
    it("deve registrar e resgatar estudantes", async () => {
      const insert = await studentRepository.insertMany([{theHuxleyName: "Lucas Barros de Almeida Machado", login: "lbam", submissions: []}]);
      console.log("count", insert.insertedCount);
      expect(insert.insertedCount).toBe(1);
      const get = await studentRepository.findAll({});
      console.log(get);
      expect(get.length).toBe(1);
    })

  })
  
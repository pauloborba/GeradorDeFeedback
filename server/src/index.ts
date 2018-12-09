import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_NAME } from "./util/secrets";
import app from "./app";

import userRoutes from "./routes/user";
import studentsRoutes from "./routes/students";
import * as passportConfig from "./config/passport";
import UserRepository from "./repositories/userRepository";
import AuthService from "./services/auth";
import TheHuxleyService from "./services/theHuxley";
import StudentRepository from "./repositories/studentRepository";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

export default MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then(async (mongo: MongoClient) => {
    const db: Db = mongo.db(MONGODB_NAME);
    
    if (process.env.NODE_ENV == 'test') { // Só é executado em testes pra limpar o banco de dados
      try {
        await db.dropCollection('users')
        await db.dropCollection('students')
        await db.dropCollection('lists')
        await db.dropCollection('submissions')
      } catch (e) {
        // Para poder apagar collections que não foram cclearriadas ainda
      }
    }

    /**
     * Primary app routes.
     */

    // Repositories and services
    const userRepository: UserRepository = new UserRepository(db);
    const authService: AuthService = new AuthService(userRepository);
    const theHuxleyService: TheHuxleyService = new TheHuxleyService();
    const studentRepository: StudentRepository = new StudentRepository(db, theHuxleyService);
    
    await theHuxleyService.login();
    
    
    passportConfig.setupPassport(userRepository, authService);
    userRoutes(authService, userRepository, app);
    studentsRoutes(authService, studentRepository, theHuxleyService, app);
    
    return app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
    
}).catch(err => console.log(err));
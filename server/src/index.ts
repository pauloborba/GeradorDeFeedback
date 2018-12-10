import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_NAME } from "./util/secrets";
import app from "./app";

import userRoutes from "./routes/user";
import listRoutes from "./routes/list";

import * as passportConfig from "./config/passport";
import UserRepository from "./repositories/userRepository";
import AuthService from "./services/auth";
import TheHuxleyService from "./services/theHuxley";
import ListRepository from "./repositories/listRepository";
import axios from "axios";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

module.exports = MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then(async (mongo: MongoClient) => {
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

    // Services
    const theHuxleyService: TheHuxleyService = new TheHuxleyService();

    // Repositories
    const userRepository: UserRepository = new UserRepository(db);
    const listRepository: ListRepository = new ListRepository(db, theHuxleyService);

    const authService: AuthService = new AuthService(userRepository);
    
  
    
    passportConfig.setupPassport(userRepository, authService);
    userRoutes(authService, userRepository, app);
    listRoutes(authService, theHuxleyService, listRepository, app);
    return app.listen(app.get("port"), async () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
      try {
        let res = await theHuxleyService.getLists();
        await listRepository.deleteMany({});
        console.log(res.data);
        await listRepository.insertMany(res.data);
      } catch (err) {
        console.log(err);
      }
    });
    
}).catch(err => console.log(err));
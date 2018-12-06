import { MongoClient, Db } from "mongodb";
import { MONGODB_URI, MONGODB_NAME } from "./util/secrets";
import app from "./app";

import userRoutes from "./routes/user";
import * as passportConfig from "./config/passport";
import UserRepository from "./repositories/userRepository";
import AuthService from "./services/auth";
import TheHuxleyService from "./services/theHuxley";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

module.exports = MongoClient.connect(mongoUrl, { useNewUrlParser: true }).then((mongo: MongoClient) => {
    const db: Db = mongo.db(MONGODB_NAME);
    /**
     * Primary app routes.
     */

    // Repositories
    const userRepository: UserRepository = new UserRepository(db);
    
    // Services
    const authService: AuthService = new AuthService(userRepository);
    const theHuxleyService: TheHuxleyService = new TheHuxleyService();
  
    
    passportConfig.setupPassport(userRepository, authService);
    userRoutes(authService, userRepository, app);
    return app.listen(app.get("port"), () => {
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
      );
      console.log("  Press CTRL-C to stop\n");
    });
}).catch(err => console.log(err));
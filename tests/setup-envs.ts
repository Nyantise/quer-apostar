import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config({ path: ".env.test" });
dotenvExpand.expand(myEnv);

import * as dotenv from "dotenv";
import path from "path";


let envFile;
switch (process.env.NODE_ENV) {
    case "docker":
        envFile = ".env.docker";
        break;
    case "production":
        envFile = ".env.prod";
        break;
    default:
        envFile = ".env.dev";
        break;
}

console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

console.log(process.env);

interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
}
interface Config {
    NODE_ENV: string;
    PORT: number;
}


const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PORT ? parseInt(process.env.PORT) : 3660,
    }
}

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

console.log("Config loaded", sanitizedConfig);
export default sanitizedConfig;
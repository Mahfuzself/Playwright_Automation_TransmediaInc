

const fs = require("fs");
const path = require("path");

export default class ENV {
  private static config: any;

  private static loadConfig() {
    const environment = process.env.NODE_ENV || "dev";

    // let testData

    const configPath = path.join(__dirname, "./envConfig.json");
    const configFile = fs.readFileSync(configPath, "utf8");
    const configData = JSON.parse(configFile);
    ENV.config = configData[environment];
  }

  public static get BASE_URL(): string {
    return ENV.config.BASE_URL;
  }

  public static get ROUTE(): string {
    return ENV.config.ROUTE;
  }

  public static get USERNAME(): string {
    return ENV.config.USERNAME;
  }

  public static get PASSWORD(): string {
    return ENV.config.PASSWORD;
  }



  // Initialize configuration when the class is loaded
  static {
    ENV.loadConfig();
  }
}

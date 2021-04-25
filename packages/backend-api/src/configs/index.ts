import ServerConfig from './server.config';
import AppConfig from './app.config';

class Config {
  public static server: ServerConfig;

  public static app: AppConfig;

  constructor() {
    this.initServerConfig();
    this.initAppConfig();
  }

  public initServerConfig = () => {
    console.log('Loading Server configs...');
    try {
      Config.server = new ServerConfig();
      console.log('Server configs loaded successfully.');
    } catch (err) {
      console.log('Server configs failed to load.');
    }
  };

  public initAppConfig = async (): Promise<void> => {
    console.log('Loading App configs...');
    try {
      Config.app = new AppConfig();
      console.log('App configs loaded successfully.');
    } catch (err) {
      console.log('App configs failed to load.');
    }
  };
}

export default Config;

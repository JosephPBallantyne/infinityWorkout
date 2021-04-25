import { AppConfigEnv, AppConfig } from '../types/configs.type';

class AppConfigImpl implements AppConfig {
  public enableFeatureX: boolean;

  constructor() {
    const dbConfigs: AppConfigEnv = {
      ENABLE_FEATURE_X: 'false',
    };
    this.enableFeatureX = dbConfigs.ENABLE_FEATURE_X === 'true';
  }
}

export default AppConfigImpl;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'dev' | 'production' | 'local' | 'qa' | 'test';
      PORT?: string;
      PWD: string;
      MONGODB_USER: string;
      MONGODB_PASSWORD: string;
      MONGODB_HOST: string;
      MONGODB_PORT: string;
      MONGODB_DB: string;
      FIREBASE_PRIVATE_KEY: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_REGION: string;
      AWS_S3_BUCKET: string;
      SPORTS_RADAR_NFL_API_KEY: string;
      SPORTS_RADAR_GLOBAL_BASKET_API_KEY: string;
      SPORTS_RADAR_AMERICAN_FOOTBAL_API_KEY: string;
      SPORTSMANIAS_MONGODB_HOST: string;
      SPORTSMANIAS_MONGODB_PORT: string;
      SPORTSMANIAS_MONGODB_USER: string;
      SPORTSMANIAS_MONGODB_PASSWORD: string;
      SPORTSMANIAS_MONGODB_DB: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

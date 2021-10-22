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
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

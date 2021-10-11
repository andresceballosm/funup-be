declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'dev' | 'production' | 'local' | 'qa';
      PORT?: string;
      PWD: string;
      MONGODB_CONNECTION: string;
      MONGODB_USER: string;
      MONGODB_PASSWORD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

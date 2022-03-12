declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: 'dev' | 'production' | 'local' | 'qa' | 'test';
      MONGODB_CNN: string;
      SECRETORPRIVATEKEY: string;
      GOOGLE_CLIENT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

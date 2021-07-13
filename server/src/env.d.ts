declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SERVER_PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    SMPT_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
  }
}
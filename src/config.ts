export const CONFIG: {
    HOST: string;
    PORT: number;

    DB_HOST: string;
    DB_SCHEMA: string;
    DB_USER: string;
    DB_PASSWORD: string;

    FILES_DIR: string;
    PUBLIC_ADDRESS: string;

} = process.env as any;
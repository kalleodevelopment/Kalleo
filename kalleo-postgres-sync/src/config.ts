import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { env } = process;

export const CARRIER_URL = env.CARRIER_URL;
export const INITIAL_SYNC = env.INITIAL_SYNC === 'false';
export const KALLEO_APP_SERVER_DATABASE_NAME = env.KALLEO_APP_SERVER_DATABASE_NAME;
export const KALLEO_APP_SERVER_MONGO_URI = env.KALLEO_APP_SERVER_MONGO_URI;
export const KALLEO_COMMUNITY_API_DATABASE_NAME = env.KALLEO_COMMUNITY_API_DATABASE_NAME;
export const KALLEO_COMMUNITY_API_MONGO_URI = env.KALLEO_COMMUNITY_API_MONGO_URI;
export const POSTGRES_DATABASE_URL = env.DATABASE_URL;
export const POSTGRES_COUNTS_ID = env.POSTGRES_COUNTS_ID;

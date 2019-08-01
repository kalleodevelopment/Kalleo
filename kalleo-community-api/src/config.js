import dotenv from 'dotenv';

dotenv.config({ path: '.env', silent: true });

const { env } = process;

export const APOLLO_ENGINE_API_KEY = env.APOLLO_ENGINE_API_KEY;
export const AUTH_CALL_CODE_REPETITION_COUNT = Number(env.AUTH_CALL_CODE_REPETITION_COUNT) || 3;
export const AUTH_CODE_LENGTH = Number(env.AUTH_CODE_LENGTH) || 4;
export const AUTH_CODE_TIMEOUT_SECONDS = Number(env.AUTH_CODE_TIMEOUT_SECONDS) || (60 * 10);
export const CARRIERS_CSV_URL = env.CARRIERS_CSV_URL;
export const ENABLE_GRAPHIQL = env.ENABLE_GRAPHIQL === 'true';
export const EVERYONE_API_ACCOUNT_SID = env.EVERYONE_API_ACCOUNT_SID;
export const EVERYONE_API_AUTH_TOKEN = env.EVERYONE_API_AUTH_TOKEN;
export const GRAPHIQL_ROUTE = env.GRAPHIQL_ROUTE || '/graphiql';
export const GRAPHQL_ROUTE = env.GRAPHQL_ROUTE || '/graphql';
export const JWT_SECRET = env.JWT_SECRET;
export const KALLEO_MASTER_API_KEY = env.KALLEO_MASTER_API_KEY;
export const MONGODB_URI = env.MONGODB_URI || 'mongodb://localhost/kalleo-community';
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT || 3000;
export const ROLLBAR_ACCESS_TOKEN = env.ROLLBAR_ACCESS_TOKEN;
export const TWILIO_ACCOUNT_SID = env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = env.TWILIO_AUTH_TOKEN;
export const TWILIO_PHONE_NUMBER = env.TWILIO_PHONE_NUMBER;
export const TWILIO_WHITE_PAGES_REP_SID = env.TWILIO_WHITE_PAGES_REP_SID;
export const TWILIO_WHITE_PAGES_REP_UNIQUE_NAME = env.TWILIO_WHITE_PAGES_REP_UNIQUE_NAME;
export const ROOT_URL = NODE_ENV === 'development';
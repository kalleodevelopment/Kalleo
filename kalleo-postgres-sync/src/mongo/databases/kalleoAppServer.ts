import Mongo from '../Mongo';
import { KALLEO_APP_SERVER_DATABASE_NAME, KALLEO_APP_SERVER_MONGO_URI } from '../../config';

const kalleoAppServer = new Mongo(KALLEO_APP_SERVER_MONGO_URI, KALLEO_APP_SERVER_DATABASE_NAME);

export default kalleoAppServer;

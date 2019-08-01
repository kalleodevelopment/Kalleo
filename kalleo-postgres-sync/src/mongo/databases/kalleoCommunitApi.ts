import Mongo from '../Mongo';
import { KALLEO_COMMUNITY_API_DATABASE_NAME, KALLEO_COMMUNITY_API_MONGO_URI} from '../../config';

const kalleoCommunityApi = new Mongo(KALLEO_COMMUNITY_API_MONGO_URI, KALLEO_COMMUNITY_API_DATABASE_NAME);

export default kalleoCommunityApi;

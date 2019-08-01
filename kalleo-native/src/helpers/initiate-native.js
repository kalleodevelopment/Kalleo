import { NativeModules } from 'react-native';
import { ApolloClient } from 'react-apollo';
import networkInterface from '../config/networkInterface';
import { generateTwilioAccessTokenMutation } from '../graphql/mutations';
import { handleError, to } from '../helpers/handleError';


const initiateNative = async (device) => {
  const apolloClient = new ApolloClient({ networkInterface });

  const [error, result] = await to(apolloClient.mutate({
    mutation: generateTwilioAccessTokenMutation,
    variables: {
      device,
    },
  }));

  if (!error) {
    const { KalleoBridge } = NativeModules;
    const { data: { generateTwilioAccessToken } } = result;

    KalleoBridge.initiateNative(generateTwilioAccessToken);
  } else {
    handleError(error);
  }
};

export default initiateNative;

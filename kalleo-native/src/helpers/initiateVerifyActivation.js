import { handleError, to } from './handleError';

export default async ({ mutate, navigation: { goBack } }) => {
  const [error] = await to(mutate({
    variables: {
      type: 'ACTIVATION',
    },
  }));

  if (error) {
    handleError(error, [{
      text: 'OK',
      onPress: goBack,
    }]);
  }
};

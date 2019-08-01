import { Bert } from 'meteor/themeteorchef:bert';

Bert.defaults.hideDelay = 10000;

export const displayErrorAlert = (message) => {
  Bert.alert({
    message,
    title: 'Error',
    type: 'danger',
  });
};

export const handleError = (error, customMessage) => {
  if (error instanceof Error) {
    let displayedMessage;

    const { graphQLErrors = [], message } = error;
    const [firstGraphqlError] = graphQLErrors;

    if (customMessage) {
      displayedMessage = customMessage;
    } else if (firstGraphqlError) {
      displayedMessage = firstGraphqlError.message;
    } else {
      displayedMessage = message;
    }

    displayErrorAlert(displayedMessage);
  }
};

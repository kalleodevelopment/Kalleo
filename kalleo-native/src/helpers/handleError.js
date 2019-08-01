import showAlertDialog from './showAlertDialog';

export { default as to } from 'await-to-js';

export const handleGraphQLErrors = graphQLErrors => graphQLErrors[0].message;

export const handleError = ({ message, graphQLErrors }, alertButtons = []) => {
  const errorMessage = graphQLErrors ? handleGraphQLErrors(graphQLErrors) : message;

  showAlertDialog({
    buttons: alertButtons,
    message: errorMessage,
    title: 'Error',
  });
};


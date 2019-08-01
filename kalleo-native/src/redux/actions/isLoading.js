import actions from './types';

const updateIsLoading = isLoading => ({
  isLoading,
  type: actions.UPDATE_IS_LOADING,
});

export default updateIsLoading;

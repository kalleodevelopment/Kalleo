import services from './services';

const findBinding = async (identity, device) => {
  const bindings = await services[device].bindings.list({ identity });
  const index = bindings.findIndex(b => b.identity === identity);

  return index !== -1 ? bindings[index] : false;
};

export default findBinding;

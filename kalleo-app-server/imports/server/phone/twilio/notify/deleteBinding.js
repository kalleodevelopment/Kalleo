import services from './services';

const deleteBinding = async (bindingSID, device) => (
  services[device].bindings(bindingSID).remove()
);

export default deleteBinding;

import services from './services';

const deviceBindingTypes = {
  ios: 'apn',
  android: 'fcm',
};

const registerBinding = async ({ identity, device, address }) => (
  services[device].bindings.create({
    identity,
    address,
    bindingType: deviceBindingTypes[device],
  })
);

export default registerBinding;

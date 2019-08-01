import { carrierLookup } from '../../../community';

const getUnforwardingCode = async ({ carrierId }) => {
  const { unforwardingCode } = await carrierLookup(carrierId);

  return unforwardingCode;
};

export default getUnforwardingCode;

import findCarrier from './findCarrier';

const findCarrierByEveryoneApiName = everyoneApiName => (
  findCarrier(c => c.everyoneApiName === everyoneApiName)
);

export default findCarrierByEveryoneApiName;

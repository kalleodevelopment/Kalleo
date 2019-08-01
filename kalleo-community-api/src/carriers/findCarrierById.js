import findCarrier from './findCarrier';

const findCarrierById = id => (
  findCarrier(c => c.id === id)
);

export default findCarrierById;

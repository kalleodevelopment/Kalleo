import fetchCarriers from './fetchCarriers';

const findCarrier = async (predicate) => {
  const carriers = await fetchCarriers();
  const foundCarrier = carriers.find(predicate);

  return foundCarrier;
};

export default findCarrier;

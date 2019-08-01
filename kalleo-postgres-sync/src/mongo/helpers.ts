import { INITIAL_SYNC } from '../config';

export const getMongoConditions = () => {
  const yesterday =  new Date(new Date().setDate(new Date().getDate() - 1));

  return INITIAL_SYNC ? {} : {
    $or: [{
      createdAt: {
        $gte: yesterday,
      },
    }, {
      updatedAt: {
        $gte: yesterday,
      },
    }],
  };
};


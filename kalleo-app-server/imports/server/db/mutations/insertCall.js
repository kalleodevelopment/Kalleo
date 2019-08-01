import Call from '../models/Call';

const insertCall = call => new Call(call).save();

export default insertCall;

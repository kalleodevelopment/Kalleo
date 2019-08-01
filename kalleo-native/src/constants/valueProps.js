import Config from 'react-native-config';

const declineImage = require('../images/value-props_1.png');
const identifyImage = require('../images/value-props_2.png');
const blockImage = require('../images/value-props_3.png');
const voicemailImage = require('../images/value-props_4.png');
const securityImage = require('../images/value-props_5.png');

const { APP_NAME } = Config;

const valueProps = [
  {
    text: 'Decline all unidentified phone calls.',
    visual: declineImage,
  },
  {
    text: `${APP_NAME} investigates the incoming number and returns the call back to you identified in seconds.`,
    visual: identifyImage,
  },
  {
    text: `${APP_NAME} blocks calls from robocallers, spammers and scammers.`,
    visual: blockImage,
  },
  {
    text: `${APP_NAME} provides an unlimited voicemail box, so you never miss a voicemail again.`,
    visual: voicemailImage,
  },
  {
    text: `${APP_NAME} encrypts returned phone calls using your LTE and Wifi, so you can have crystal-clear conversations.`,
    visual: securityImage,
  },
];

export default valueProps;

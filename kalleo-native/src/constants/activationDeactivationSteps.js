const steps = isDeactivated => ([
  'Tap the button above',
  `Your phone will call the kalleo ${isDeactivated ? 'forwarding' : 'unfowarding'} number`,
  'Return to kalleo app to verify',
]);

export default steps;

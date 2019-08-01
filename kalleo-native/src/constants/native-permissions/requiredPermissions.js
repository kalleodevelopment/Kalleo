export default {
  CALL_PHONE: {
    type: 'callPhone',
    unauthorizedMessage: 'We need your permission to use and manage your phone.',
  },
  MICROPHONE: {
    type: 'microphone',
    unauthorizedMessage: 'We need your Microphone Permission to receive VoIP call. You can give us permission at your Phone Settings.',
    },
    READ_CONTACTS: {
        type: 'read_contacts',
        unauthorizedMessage: 'We need your Contacts Permission to read your contacts. You can give us permission at your Phone Settings.',
    },
    WRITE_CONTACTS: {
        type: 'write_contacts',
        unauthorizedMessage: 'We need your Contacts Permission to add our number to your contacts. You can give us permission at your Phone Settings.',
    },
};

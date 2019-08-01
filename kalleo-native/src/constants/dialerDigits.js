const dialerDigits = [
  {
    alphabet: null,
    digit: 1,
  },
  {
    alphabet: 'ABC',
    digit: 2,
  },
  {
    alphabet: 'DEF',
    digit: 3,
  },
  {
    alphabet: 'GHI',
    digit: 4,
  },
  {
    alphabet: 'JKL',
    digit: 5,
  },
  {
    alphabet: 'MNO',
    digit: 6,
  },
  {
    alphabet: 'PQRS',
    digit: 7,
  },
  {
    alphabet: 'TUV',
    digit: 8,
  },
  {
    alphabet: 'WXYZ',
    digit: 9,
  },
  {
    alphabet: null,
    digit: '*',
  },
  {
    alphabet: '+',
    digit: 0,
  },
  {
    alphabet: null,
    digit: '#',
  },
];

export default dialerDigits.map((digit, key) => ({ ...digit, key }));

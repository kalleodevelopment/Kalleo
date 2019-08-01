// Use this helper to make extendable classes in the Babel compiler.
// This is particularly useful for checking "instanceof" on extended "Error" types.
// Source: https://stackoverflow.com/questions/33870684
function makeExtendableClass(BuiltInClass) {
  function ExtendableClass(...args) {
    BuiltInClass.apply(this, args);
  }

  ExtendableClass.prototype = Object.create(BuiltInClass.prototype);
  Object.setPrototypeOf(ExtendableClass, BuiltInClass);

  return ExtendableClass;
}

class AppError extends makeExtendableClass(Error) {
  constructor(...args) {
    super(...args);

    this.name = 'Error';
    this.message = args[0]; // eslint-disable-line prefer-destructuring

    Error.captureStackTrace(this, 'Error');
  }
}

export default AppError;

const toCallerIdName = ({
  name,
  cnam,
  expanded_name: expandedName = {},
}) => {
  const {
    first: firstName,
    last: lastName,
  } = expandedName;

  const fullName = firstName && lastName ? `${firstName} ${lastName}` : null;
  const callerIdName = fullName || name || cnam;

  return callerIdName ? callerIdName.trim() : null;
};

export default toCallerIdName;

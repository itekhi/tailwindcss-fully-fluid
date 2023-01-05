module.exports = (rawValue, base=16) => {
  if (Array.isArray(rawValue)) {
    rawValue = rawValue[0];
  }

  const val = parseFloat(rawValue);

  if (!val) return null;

  if (rawValue.endsWith('rem')) {
    return base * val;
  } else if (rawValue.endsWith('px')) {
    return val;
  }
}

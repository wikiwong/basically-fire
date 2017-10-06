export const empty = (value) => {
  return !value && 'required';
};

export const confirmMatch = (fieldToMatchWith = '', value, allValues = {}) => {
  const valueToMatchWith = allValues[fieldToMatchWith];
  if (!valueToMatchWith || valueToMatchWith !== value) {
    return 'not the same';
  };
}

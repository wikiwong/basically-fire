import { createSelector } from 'reselect';

const providerSelector = ({ user }) => {
  const providerData = user && user.providerData && user.providerData[0];
  if (providerData) {
    return providerData;
  }
  return null;
}

export default createSelector(
  providerSelector,
  (provider) => provider
);

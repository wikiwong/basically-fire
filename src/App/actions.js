const APP_INIT = 'APP_INIT';

function appInit() {
  return {
    type: APP_INIT,
    time: new Date()
  };
}

export {
  APP_INIT,
  appInit
}

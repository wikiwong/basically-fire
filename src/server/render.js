import React from 'react';
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux'
import App from '../App';
import configureStore from '../configureStore';
import shell from './views/shell';
import { completeLogin } from '../App/scenes/Login/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default (req, res) => {

  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';

  const store = configureStore();

  if (req.isAuthenticated()) {
    const { session: { passport: { user } } } = req;
    const { username, email } = user || {};
    store.dispatch(completeLogin({ username, email }));
  }

  const context = {};
  // render the first time
  let markup = renderToString(
    <MuiThemeProvider>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </MuiThemeProvider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: result.redirect.pathname
    });
    res.end()
  } else {
    res.write(shell(markup, store.getState()));
    res.end();
  }
};

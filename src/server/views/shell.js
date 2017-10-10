export default (app = '', initialState = {}) => {
  const css = (process.env.NODE_ENV === 'development') ? '': '<link href="/assets/app.bundle.css" rel="stylesheet" />';
  return `<!doctype html>
    <html lang="en">
      <head>
        <title>Basically Fire</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        ${css}
        <style>
          body {
            font-family: 'Roboto', sans-serif;
          }
        </style>
      </head>
      <body>
        <div id="root">${app}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

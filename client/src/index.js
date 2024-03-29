import React from 'react';
import ReactDOM from 'react-dom';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.variable.min.css';

import bugsnagConfig from './config/bugsnag';

Bugsnag.start({
  ...bugsnagConfig,
  plugins: [new BugsnagPluginReact()],
});

// Create the error boundary...
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const ErrorView = () => (
  <div style={{ marginTop: '40vh', textAlign: 'center' }}>
    <h1>⚠️</h1>
    <h2>
      <strong>Sorry, something went wrong</strong>
      <br />
      If the issue persists please contact us at enquire@giveyourbest.uk
    </h2>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorView}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

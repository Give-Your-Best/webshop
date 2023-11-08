import React from 'react';
import ReactDOM from 'react-dom';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.variable.min.css';

Bugsnag.start({
  apiKey: 'fb3f2d4e229463de31f3ed1a61918875',
  plugins: [new BugsnagPluginReact()],
});

// Create the error boundary...
const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const ErrorView = () => (
  <div>
    <p>Inform users of an error in the component tree.</p>
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

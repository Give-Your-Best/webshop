/**
 * In create-react-app NODE_ENV is _always_ 'production' with `npm run build`
 * and cannot be set to 'staging' or any other value. In order to provide a real
 * staging flag to the react app we are passing the node env from heroku to the
 * `heroku-postbuild` script which runs a build with REACT_APP_ENV set either to
 * 'staging' or 'production' accordingly.
 */

module.exports = process.env.REACT_APP_ENV || 'development';

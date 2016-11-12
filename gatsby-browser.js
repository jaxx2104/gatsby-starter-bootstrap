import ReactGA from 'react-ga'
import {config} from 'config'

ReactGA.initialize(config.googleAnalyticsId);

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.pathname);
};
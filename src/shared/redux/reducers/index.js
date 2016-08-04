import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import auth from './auth';
import ui from './ui';

export default (client) => combineReducers({
  routing,
  form,
  auth,
  apollo: client.reducer()
});

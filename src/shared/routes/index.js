import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { App, NotFound } from '../containers';
import AllTodos from './AllTodos';
import EditTodo from './EditTodo';

export default (
  <Route path="/" component={App}>
    { /* Home (landing) route */ }
    <IndexRoute component={AllTodos} />

    { /* Routes */ }
    <Route path="/todo/edit/:id" component={EditTodo} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

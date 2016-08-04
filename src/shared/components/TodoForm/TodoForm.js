import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Form,
  Button,
  Checkbox,
  FormGroup,
  FormControl } from '@sketchpixy/rubix';

export default class TodoForm extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  createTodo(e) {
    e.preventDefault();

    const input = ReactDOM.findDOMNode(this.input);

    const todo = input.value;

    const { dispatch, actions } = this.props;

    dispatch(actions.createTodo({ todo }));

    input.value = '';
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={::this.createTodo}>
          <FormGroup>
            <Col sm={10}>
              <FormControl type="text" placeholder="A todo item..." ref={(input) => this.input = input} autoFocus />
            </Col>
            <Col sm={2} collapseLeft>
              <br className="visible-xs" />
              <Button type="submit" bsStyle="blue" block onlyOnHover>Create Todo</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

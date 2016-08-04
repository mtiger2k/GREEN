import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

import {
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Checkbox,
  ButtonGroup,
} from '@sketchpixy/rubix';

@withRouter
export default class Todo extends React.Component {
  static propTypes = {
    todo: PropTypes.object,
    actions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  toggleCompletion() {
    const { _id } = this.props.todo;
    const { dispatch, actions } = this.props;

    dispatch(actions.updateTodo({
      _id,
      completed: this.input.checked
    }));
  }

  removeTodo() {
    const { _id } = this.props.todo;
    const { dispatch, actions } = this.props;

    dispatch(actions.removeTodo({ _id }));
  }

  editTodo() {
    this.props.router.push(`/todo/edit/${this.props.todo._id}`);
  }

  render() {
    const { todo, completed } = this.props.todo;
    const style = {
      textDecoration: completed ? 'line-through' : null
    };

    return (
      <Grid>
        <Row className="todo-item">
          <Col sm={8}>
            <Checkbox onChange={::this.toggleCompletion} style={style} inputRef={(input) => { this.input = input; }} checked={completed} >
              {todo}
            </Checkbox>
          </Col>
          <Col sm={4} className="text-right">
            <Button bsStyle="red" className="remove-sm" onClick={::this.removeTodo} style={{marginRight: 12.5}}>Remove</Button>
            <Button bsStyle="green" className="remove-sm" onlyOnHover onClick={::this.editTodo}>Edit</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

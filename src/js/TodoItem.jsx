import React, {Component} from 'react';

const marginOne = {
    marginLeft: 1
}

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.onTodoMarked = this
            .onTodoMarked
            .bind(this);
    }

    onTodoMarked() {
        this.props.onChange(this.props.index, !this.props.done);
    }

    render() {
        return (
            <li className="list-group-item">
                <div className="checkbox">
                    <input
                        style={marginOne}
                        type="checkbox"
                        id={"checkbox" + this.props.index}
                        onChange={this.onTodoMarked}
                        checked={this.props.done}/>
                    <label onClick={this.onTodoMarked}>
                        {this.props.text}
                    </label>
                </div>
                <div className="pull-right action-buttons">
                    <a href="#">
                        <span className="glyphicon glyphicon-pencil"></span>
                    </a>
                    <a
                        href="#"
                        className="trash"
                        onClick={() => this.props.onDelete(this.props.index)}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </a>
                </div>
            </li>
        );
    }
}

export default TodoItem;
import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var checkbox;
        if (this.props.done) {
            checkbox = (<input
                style={{
                marginLeft: 1
            }}
                type="checkbox"
                id={"checkbox" + this.props.index}
                checked
                onChange={() => this.props.onChange(this.props.index, !this.props.done)}/>);
        } else {
            checkbox = (<input
                style={{
                marginLeft: 1
            }}
                type="checkbox"
                id={"checkbox" + this.props.index}
                onChange={() => this.props.onChange(this.props.index, !this.props.done)}/>);
        }

        return (
            <li className="list-group-item">
                <div className="checkbox">
                    {checkbox}
                    <label onClick={() => this.props.onChange(this.props.index, !this.props.done)}>
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
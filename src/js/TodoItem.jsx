import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        var label;
        if (this.props.done) {
            label = (
                <s>{this.props.text}</s>
            );
        } else {
            label = (
                <span>{this.props.text}</span>
            );
        }

        return (
            <div className="todo"><img
                onClick={() => this.props.onChange(this.props.index, !this.props.done)}
                src={(this.props.done)
                ? './images/checked.png'
                : './images/unchecked.png'}
                width={18}
                height={18}/>&nbsp;{label}
                <button
                    type="button"
                    className="btn btn-danger btn-xs pull-right"
                    onClick={() => this.props.onDelete(this.props.index)}>
                    <span className="glyphicon glyphicon-minus"></span>
                </button>
            </div>
        );
    }
}

export default TodoItem;
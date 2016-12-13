import React, {Component} from 'react';
import TodoItem from './TodoItem.jsx';
import $ from 'jquery';
import Modal from 'react-bootstrap-modal'
var fs = eRequire('fs');
var savedTodos = JSON.parse(fs.readFileSync(dataLocation));

class MainWindow extends Component {
    constructor(props, context) {
        super(props, context);

        this.onInsertTodo = this
            .onInsertTodo
            .bind(this);

        this.onTodoChange = this
            .onTodoChange
            .bind(this);

        this.onTodoDelete = this
            .onTodoDelete
            .bind(this);

        this.onTodoDeleteOk = this
            .onTodoDeleteOk
            .bind(this);

        this.onDeleteModalHide = this
            .onDeleteModalHide
            .bind(this);

        this.onEditModalHide = this
            .onEditModalHide
            .bind(this);

        this.onTodoEdit = this
            .onTodoEdit
            .bind(this);

        this.onTodoEditSave = this
            .onTodoEditSave
            .bind(this);

        this.state = {
            todos: savedTodos,
            editVisible: false,
            deleteModalVisible: false,
            editIndex: -1,
            editText: ''
        };
    }

    componentDidUpdate() {
        fs
            .writeFile(dataLocation, JSON.stringify(this.state.todos), 'utf-8', function (err) {
                if (err) {
                    console.log(err);
                }
            });
    }

    onInsertTodo(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var text = $('#todoInput')
                .val()
                .trim();
            $('#todoInput').val('');
            if (text) {
                var todos = this
                    .state
                    .todos
                    .slice(0);
                todos.push({text: text, done: false});
                this.setState({todos: todos});
            }
            return false;
        }
        return true;
    }

    onTodoChange(index, state) {
        var todos = this
            .state
            .todos
            .slice(0);
        todos[index].done = state;
        this.setState({todos: todos});
    }

    onTodoEdit(index, text) {
        this.setState({editVisible: true, editIndex: index, editText: text});
    }

    onTodoEditSave() {
        var text = $('#todoEdit')
            .val()
            .trim();
        $('#todoEdit').val('');
        var todos = this
            .state
            .todos
            .slice(0);
        if (text) {
            todos[this.state.editIndex]["text"] = text;
        }
        this.setState({editVisible: false, editIndex: -1, editText: '', todos: todos});
    }

    onEditModalHide() {
        this.setState({editVisible: false});
    }

    onTodoDelete(index, text) {
        this.setState({deleteModalVisible: true, editIndex: index, editText: text});
    }

    onTodoDeleteOk() {
        var todos = this
            .state
            .todos
            .slice(0);
        todos.splice(this.state.editIndex, 1);
        this.setState({deleteModalVisible: false, editIndex: -1, editText: '', todos: todos});
    }

    onDeleteModalHide() {
        this.setState({deleteModalVisible: false});
    }

    render() {
        var todos = this
            .state
            .todos
            .slice(0);
        todos = todos.map((item, index) => {
            return (<TodoItem
                key={index}
                index={index}
                text={item.text}
                done={item.done}
                onChange={this.onTodoChange}
                onDelete={this.onTodoDelete}
                onEdit={this.onTodoEdit}/>);
        });

        return (
            <div className="container">
                <div className="input-group primary-text">
                    <span className="input-group-addon">
                        <span
                            style={{
                            marginRight: 0
                        }}
                            className="glyphicon glyphicon-plus"></span>
                    </span>
                    <input
                        className="form-control"
                        id="todoInput"
                        type="text"
                        placeholder="Todo..."
                        onKeyPress={this.onInsertTodo}/>
                </div>
                <ul className="list-group">{todos}</ul>
                {/* -------- Edit Todo Item -------------- */}
                <Modal
                    show={this.state.editVisible}
                    onHide={this.onEditModalHide}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Edit Todo Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            className="form-control"
                            id="todoEdit"
                            type="text"
                            placeholder="Todo..."
                            onKeyPress={this.onTodoNewTextSave}
                            defaultValue={this.state.editText}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                        <button className='btn btn-primary' onClick={this.onTodoEditSave}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* ---------------- Delete Todo Item --------------- */}
                <Modal
                    show={this.state.deleteModalVisible}
                    onHide={this.onDeleteModalHide}
                    aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Delete Todo Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete item '{this.state.editText}' ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                        <button className='btn btn-primary' onClick={this.onTodoDeleteOk}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default MainWindow;
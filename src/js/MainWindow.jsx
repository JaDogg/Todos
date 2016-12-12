import React, {Component} from 'react';
import TodoItem from './TodoItem.jsx';
import $ from 'jquery';
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

        this.state = {
            todos: savedTodos
        };
    }

    componentDidUpdate() {
        fs.writeFile(dataLocation, JSON.stringify(this.state.todos), 'utf-8', function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    onInsertTodo(event) {
        if (event.which == 13 || event.keyCode == 13) {
            var text = $('#todoInput').val().trim();
            $('#todoInput').val('');
            if (text) {
                var todos = this.state.todos.slice(0);
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

    onTodoDelete(index) {
        var todos = this
            .state
            .todos
            .slice(0);
        todos.splice(index, 1);
        this.setState({todos: todos});
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
                onDelete={this.onTodoDelete}/>);
        });

        return (
            <div>
                <input
                    className="form-control"
                    id="todoInput"
                    type="text"
                    placeholder="Todo..."
                    onKeyPress={this.onInsertTodo}/> {todos}
            </div>
        );
    }
}

export default MainWindow;
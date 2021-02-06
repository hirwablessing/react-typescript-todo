import { useState, FormEvent, Fragment } from "react"

interface TodoInt {
    text: string,
    complete: boolean
}
function Todo() {
    const [todos, setTodo] = useState<TodoInt[]>([])
    const [value, setValue] = useState<string>('')


    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addTodo(value)
        setValue("")
    }

    const addTodo = (text: string): void => {
        const newTodos: TodoInt[] = [...todos, { text, complete: false }]
        setTodo(newTodos)
    }

    const completeTodo = (index: number): void => {
        const newTodos: TodoInt[] = [...todos];
        newTodos[index].complete = !newTodos[index].complete;
        setTodo(newTodos)
    }

    const deleteTodo = (index: number): void => {
        const newTodos: TodoInt[] = [...todos];
        newTodos.splice(index, 1);
        setTodo(newTodos)
    }

    return (
        <>
            <h1>Add todo</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
                <button type="submit">Add</button>
                <div className="todos">

                    {todos.map((todo: TodoInt, index: number) =>
                        <Fragment key={index + 1}>
                            <div style={{ textDecoration: todo.complete ? "line-through" : "" }}>{todo.text}</div>
                            {/* we have to set the type of the button to button to avoid creation of a button on every click */}
                            <button type="button" onClick={() => completeTodo(index)}>
                                {' '}
                                {todo.complete ? "Incomplete" : "Complete"}
                            </button>
                            <button type="button" onClick={() => deleteTodo(index)}>&times;</button>
                        </Fragment>
                    )}

                </div>
            </form>
        </>
    )
}

export default Todo

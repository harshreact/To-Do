import React, { createContext,useEffect, useState } from 'react'

export const TodoContext = createContext();

const TodoProvider=({children})=>{
    const [todo,setTodo]=useState(()=>{
        try{
            const savetodo=localStorage.getItem("todo");
            return savetodo ? JSON.parse(savetodo):[];
        }
        catch(error){
            console.error("Error",error);
            return[]
        }
    });

    useEffect(()=>{
        localStorage.setItem("todo",JSON.stringify(todo));
    },[todo]);

    const addTodo=(newTask)=>{
        const newtodo=[...todo,{...newTask,id: Date.now().toString()}];
        setTodo(newtodo);
    };

    const updateTodo=(updatedTodo)=>{
        setTodo(todo.map((td)=>td.id===updatedTodo.id ? updatedTodo : td));
    };

    const deleteTodo=(id)=>{
        setTodo(todo.filter((td)=>td.id!==id));
    };

    return(
        <TodoContext.Provider value={{todo,addTodo,updateTodo,deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
};

export default TodoProvider;
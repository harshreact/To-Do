import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TodoContext } from './TodoContext';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { CiViewTimeline } from "react-icons/ci";
import { MdCheckBox } from "react-icons/md";

const Todo = () => {
    const{todo,deleteTodo}=useContext(TodoContext)
    const navigate=useNavigate();

  return (
    <div className='bg-gray-600 min-h-screen w-full flex flex-col gap-1'>
        <h1 className='flex items-center justify-center gap-1 text-4xl text-center p-3'><span className='flex items-center text-4xl'><GoChecklist /></span>To-Do List</h1>
        <p className='flex  justify-center text-xl'>"Stay Organized, Stay Productive! <span className='flex items-center text-xl pt-0.5'><MdCheckBox/></span>"</p>
        <div className='flex justify-end p-2'>
            <button className='flex gap-1 bg-white rounded-xl text-black px-1 cursor-pointer' onClick={()=>navigate("/addtask")}>Add Task <span className='flex items-center'><IoMdAddCircle /></span></button>
        </div>
        <div className='flex justify-center border rounded-t-xl m-2'>
            <table className='w-full'>
                <thead>
                    <tr className='text-center text-2xl border-b'>
                        <th className='border-r p-1'>Sr No.</th>
                        <th className=' p-1'>Task</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((td,index)=>(
                        <tr key={td.id} className='text-2xl'>
                            <td className='p-1 text-center'>{index+1}.</td>
                            <td className='p-1 pl-3 font-bold text-xl text-left'>{td.title} <br /> <span className='font-normal text-base'>{td.desc}</span></td>
                            <td className='p-1'>
                                <div className='flex gap-2 justify-center'>
                                    <button className='relative group bg-green-500 rounded-sm p-1 hover:bg-green-300 cursor-pointer' onClick={() => navigate(`/addtask/${td.id}`)}>
                                        <FaRegEdit />
                                        <span className='absolute -left-1 -top-6 px-2 text-sm font-medium text-white bg-green-500 rounded-sm shadow-sm opacity-0 group-hover:opacity-100'>
                                            Edit
                                        </span>
                                    </button>
                                    <button className='relative group bg-red-500 rounded-sm p-1 cursor-pointer hover:bg-red-300' onClick={()=>deleteTodo(td.id)}><MdDeleteOutline />
                                        <span className='absolute px-2 -top-6 -left-3 text-sm font-medium text-white bg-red-500 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 '>
                                            Delete
                                        </span>
                                    </button>
                                    <button className='relative group bg-blue-500 rounded-sm p-1 cursor-pointer' onClick={()=>navigate(`/status/${td.id}`)}><CiViewTimeline />
                                        <span className='absolute px-2 -top-6 -left-3 text-sm font-medium text-white bg-blue-500 rounded-sm shadown-sm opacity-0 group-hover:opacity-100'>
                                            Status
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Todo
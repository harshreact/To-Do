import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from './TodoContext';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { GoChecklist } from "react-icons/go";
import { CiViewTimeline } from "react-icons/ci";


const Todo = () => {
  const { todo, deleteTodo } = useContext(TodoContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-cyan-100 to-blue-100 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="flex items-center justify-center text-4xl font-bold text-gray-800 gap-2 mb-2">
          <GoChecklist/> To-Do List
        </h1>
        <p className="text-center text-lg text-gray-700 my-6 flex justify-center items-center gap-1">
          "Stay Organized, Stay Productive!"
        </p>

        <div className="flex justify-end mb-4">
          <button
            className="flex items-center cursor-pointer gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl shadow-md transition duration-200"
            onClick={() => navigate("/addtask")}
          >
            <IoMdAddCircle className="text-xl" />
            Add Task
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-blue-200 text-gray-800 text-lg">
                <th className="py-3 px-4 border-b">Sr No.</th>
                <th className="py-3 px-4 border-b text-left">Task</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((td, index) => (
                <tr key={td.id} className="hover:bg-blue-50 transition duration-150">
                  <td className="py-3 px-4 text-center text-gray-700">{index + 1}.</td>
                  <td className="py-3 px-4 text-left text-gray-800">
                    <span className="font-semibold text-lg">{td.title}</span><br />
                    <span className="text-sm text-gray-600">{td.desc}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3">
                      <div className="relative group">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition cursor-pointer"
                          onClick={() => navigate(`/addtask/${td.id}`)}
                        >
                          <FaRegEdit />
                        </button>
                        <span className="absolute text-xs font-medium text-white bg-green-600 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition -top-8 left-1/2 -translate-x-1/2">
                          Edit
                        </span>
                      </div>

                      <div className="relative group">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition cursor-pointer"
                          onClick={() => deleteTodo(td.id)}
                        >
                          <MdDeleteOutline />
                        </button>
                        <span className="absolute text-xs font-medium text-white bg-red-600 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition -top-8 left-1/2 -translate-x-1/2">
                          Delete
                        </span>
                      </div>

                      <div className="relative group">
                        <button
                          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition cursor-pointer"
                          onClick={() => navigate(`/status/${td.id}`)}
                        >
                          <CiViewTimeline />
                        </button>
                        <span className="absolute text-xs font-medium text-white bg-indigo-600 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition -top-8 left-1/2 -translate-x-1/2">
                          Status
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {todo.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500 text-lg">
                    No tasks yet. Click "Add Task" to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;

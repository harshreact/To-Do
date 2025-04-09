import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoContext } from "./TodoContext";
import { GiJourney } from "react-icons/gi";
import { FiCalendar } from "react-icons/fi";

const Addtask = () => {
  const { todo, addTodo, updateTodo } = useContext(TodoContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: "",
    title: "",
    desc: "",
    dl: "",
    cs: "",
  });

  useEffect(() => {
    if (id) {
      const todoedit = todo.find((td) => td.id === id);
      if (todoedit) setTask(todoedit);
    }
  }, [id, todo]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.desc.trim()) {
      alert("Fields cannot be empty.");
      return;
    }
    id ? updateTodo(task) : addTodo(task);
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-cyan-200 to-blue-100 px-4 py-10">
      <h1 className="flex gap-2 items-center text-4xl font-bold text-gray-800 mb-6">
        <GiJourney className="text-4xl" />
        New Journey Begins...
      </h1>

      <form className="bg-white w-full max-w-md shadow-lg rounded-2xl p-6 space-y-5">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium text-gray-700">Task Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-400"
            placeholder="Ex: Build a To-Do App"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="desc" className="text-lg font-medium text-gray-700">Task Description</label>
          <textarea
            id="desc"
            name="desc"
            className="mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-400"
            rows="4"
            placeholder="Describe your task"
            value={task.desc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="sd" className="text-lg font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="sd"
            name="sd"
            className="mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 text-gray-400"
            value={task.sd}
            onChange={handleChange}
          />
          <FiCalendar className="absolute right-3 bottom-3 text-gray-500 pointer-events-none" />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="dl" className="text-lg font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            id="dl"
            name="dl"
            className="mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10 text-gray-400"
            value={task.dl}
            onChange={handleChange}
          />
          <FiCalendar className="absolute right-3 bottom-3 text-gray-500 pointer-events-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="cs" className="text-lg font-medium text-gray-700">Current Status</label>
          <select
            id="cs"
            name="cs"
            className="mt-1 px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-400"
            value={task.cs}
            onChange={handleChange}
          >
            <option value="default">Not Started</option>
            <option value="Starting">Starting</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back to List
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition duration-200 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addtask;

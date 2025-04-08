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
    cs: "Starting",
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
    if (!task.title.trim() || !task.desc.trim()) {
      alert("can't be null");
      return;
    }

    e.preventDefault();
    if (id) {
      updateTodo(task);
    } else {
      addTodo(task);
    }
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen items-center gap-4 bg-cyan-200 text-center">
      <h1 className="flex gap-2 text-black text-4xl">
        <span className="flex items-center">
          <GiJourney />
        </span>
        New Journey begins...
      </h1>
      <div>
        <form className="bg-white flex flex-col p-3 rounded-sm gap-2">
          <div className="text-black flex flex-col gap-1">
            <label htmlFor="title" name="title">
              Task title
            </label>
            <input
              className="border rounded-sm"
              value={task.title}
              type="text"
              id="title"
              name="title"
              placeholder="Ex : To-Do List"
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-black flex flex-col gap-1">
            <label htmlFor="desc" name="desc">
              Task Description
            </label>
            <textarea
              value={task.desc}
              id="desc"
              name="desc"
              className="border rounded-sm resize-none"
              placeholder="Describe your task"
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-black flex flex-col gap-1 relative">
            <label htmlFor="sd" name="sd">
              Starting Date
            </label>
            <input
              type="date"
              id="sd"
              name="sd"
              value={task.sd}
              className="border rounded-sm pr-10"
              onChange={handleChange}
            />
            <FiCalendar className="absolute right-2 top-8 text-gray-500 pointer-events-none" />
          </div>

          <div className="text-black flex flex-col gap-1 relative">
            <label htmlFor="dl" name="dl">
              DeadLine
            </label>
            <input
              type="date"
              id="dl"
              name="dl"
              className="border rounded-sm pr-10"
              value={task.dl}
              onChange={handleChange}
            />
            <FiCalendar className="absolute right-2 top-8 text-gray-500 pointer-events-none" />
          </div>

          <div className="text-black flex flex-col gap-1">
            <label htmlFor="cs" name="cs">
              Current Status
            </label>
            <select
              id="cs"
              name="cs"
              className="border rounded-sm"
              value={task.cs}
              onChange={handleChange}
            >
              <option value="NotStarted">Not Started</option>
              <option value="Starting">Starting</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="bg-blue-500 rounded-xl p-1 cursor-pointer"
              onClick={() => navigate("/")}
            >
              To-Do List
            </button>
            <button
              type="submit"
              className="bg-green-500 rounded-xl p-1 cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addtask;

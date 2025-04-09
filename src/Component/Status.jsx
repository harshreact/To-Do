import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TodoContext } from './TodoContext';

import { GiPin } from "react-icons/gi";
import { MdDescription } from "react-icons/md";
import { FcCalendar } from "react-icons/fc";
import { BsHourglassSplit } from "react-icons/bs";
import { FaMapPin } from "react-icons/fa";
import { FcClock } from "react-icons/fc";

const Status = () => {
  const { todo } = useContext(TodoContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const task = todo.find((td) => td.id === id);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRemainingTime = (deadline) => {
    if (!deadline) return "N/A";
    const today = new Date();
    const dueDate = new Date(deadline);
    const timeDiff = dueDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining > 0) return `${daysRemaining} days remaining`;
    if (daysRemaining === 0) return "Due today!";
    return `Overdue by ${Math.abs(daysRemaining)} days`;
  };

  const getPercentage = (timeDiff, daysRemaining) => {
    if (!timeDiff || !daysRemaining) return "0% Completed";
    const progress = ((timeDiff - daysRemaining) / timeDiff) * 100;
    return `${Math.min(100, Math.max(0, Math.round(progress)))}% Completed`;
  };

  const totalTime = Math.abs(new Date(task.dl) - new Date(task.sd)) / (1000 * 60 * 60 * 24);
  const daysRemaining = Math.ceil((new Date(task.dl) - new Date()) / (1000 * 60 * 60 * 24));

  const getStatusColor = () => {
    switch (task.cs) {
      case "NotStarted": return "bg-gray-500";
      case "Starting": return "bg-orange-500";
      case "Ongoing": return "bg-yellow-400 text-black";
      case "Completed": return "bg-green-500";
      default: return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 p-6 flex flex-col gap-8">
        <div className="flex justify-end">
            <button
            className="bg-white text-blue-700 px-4 py-1 rounded-xl shadow hover:bg-blue-50 transition cursor-pointer"
            onClick={() => navigate(`/`)}
            >
                Back to List
            </button>
        </div>

        <div className='flex flex-col gap-8'>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                {/* Task Info Section */}
                <div className="flex flex-col gap-6 bg-white p-6 rounded-xl shadow-md w-full md:w-2/3">
                    <div className="text-gray-800 flex flex-col gap-2">
                        <h1 className=" flex justify-center items-center text-3xl font-bold mb-2"><GiPin className='text-red-500'/> Title: {task.title}</h1>
                        <h3 className=" flex items-center text-xl text-gray-600"><MdDescription className='text-purple-300'/> Description: {task.desc}</h3>
                    </div>

                    <div className="text-gray-700 space-y-2 text-left">
                        <p className='flex items-center text-lg'><FcCalendar/> Starting Date: <strong>{formatDate(task.sd)}</strong></p>
                        <p className='flex items-center text-lg'><BsHourglassSplit className='text-amber-200'/> Deadline: <strong>{formatDate(task.dl)}</strong></p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <p className="flex items-center text-gray-800 font-medium"><FaMapPin className='text-red-500'/> Current Status:</p>
                        <span className={`${getStatusColor()} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                            {task.cs}
                        </span>
                    </div>
                </div>

                {/* Progress Circle */}
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <div className="w-44 h-44 rounded-full border-8 border-green-400 bg-white flex items-center justify-center shadow-lg">
                        <span className="text-xl font-bold text-green-700">
                            {getPercentage(totalTime, daysRemaining)}
                        </span>
                    </div>
                </div> 
            </div>   
                
            {/* Remaining Time Section */}
            <div className="flex items-center justify-center">
                <p className="flex items-center bg-red-500 text-white text-md px-4 py-2 rounded-xl shadow">
                    <FcClock/> Remaining Time: {getRemainingTime(task.dl)}
                </p>
            </div>
        </div>
    </div>
  );
};

export default Status;
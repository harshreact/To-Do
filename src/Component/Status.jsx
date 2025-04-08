import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from './TodoContext'


const Status = () => {
    const {todo}=useContext(TodoContext)
    const {id}=useParams()
    const navigate=useNavigate()

    const task=todo.find((td)=>td.id === id)

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

        if (daysRemaining > 0) {
            return `${daysRemaining} days remaining`;
        } else if (daysRemaining === 0) {
            return "Due today!";
        } else {
            return `Overdue by ${Math.abs(daysRemaining)} days`;
        }
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
            case "NotStarted":
                return "bg-gray-500 text-white px-2 rounded-xl";
            case "Starting":
                return "bg-orange-500 text-white px-2 rounded-xl";
            case "Ongoing":
                return "bg-yellow-400 text-white px-2 rounded-xl";
            case "Completed":
                return "bg-green-500 text-white px-2 rounded-xl";
            default:
                return "bg-gray-300 text-black px-2 rounded-xl";
        }
    };

  return (
    <div className='flex flex-col gap-10 p-5'>
        <div className='flex justify-end'>
                <p className='px-2 bg-white text-black rounded-xl cursor-pointer' onClick={()=>navigate(`/`)}>Back to List</p>
        </div>
        <div className='flex gap-90'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col justify-center gap-15 text-left'>
                    <h1 className='text-4xl'>Title: {task.title}</h1>
                    <h3 className='text-2xl'>Description: {task.desc}</h3>
                </div>
                <div className='text-left'>
                    <p>Starting Date: {formatDate(task.sd)}</p>
                    <p>DeadLine: {formatDate(task.dl)}</p>
                </div>
                <div className=' flex items-center gap-2 text-left'>
                    <p>Current status: </p>
                    <p className={getStatusColor(task.cs)}>{task.cs}</p>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center bg-green-500 rounded-full w-[170px] h-[170px]'>
                    <p>
                        {getPercentage(totalTime, daysRemaining)}
                    </p>
                </div>
            </div>
        </div>
        <div className='flex items-center justify-center'>
            <p className='bg-red-500 rounded-xl px-2'>Remaining Time: {getRemainingTime(task.dl)}</p>
        </div>
    </div>
  )
}

export default Status
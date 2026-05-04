import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task.trim(), completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">My To-Do List</h2>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
          />
          <button
            onClick={addTask}
            className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet</p>
          ) : (
            tasks.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border rounded-md hover:shadow transition"
              >
                <span
                  onClick={() => toggleTask(index)}
                  className={`cursor-pointer flex-grow text-black ${item.completed ? "line-through text-gray-400" : ""}`}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

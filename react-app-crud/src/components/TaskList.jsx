import axios from "axios";
import React, { useEffect, useState } from "react";


function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
  const token = localStorage.getItem("token");
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  const handleEdit = async (taskId, stasus = null) => {
    const taskData = {
      taskName: taskName, // Current state or default
      description: description, // Current state or default
    };

 
    try {
      const response = await axios.patch(
        `${apiEndpoint}/api/updatetask/${taskId}`,
        taskData
      );
      if (response.status === 200) {
        console.log("Task updated successfully");
        fetchData(); // Refresh task list
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDone = async (taskId, stasus) => {
    const taskData = {
      stasus:stasus
    };

 
    try {
      const response = await axios.patch(
        `${apiEndpoint}/api/updatetask/${taskId}`,
        taskData
      );
      if (response.status === 200) {
        console.log("Task updated successfully");
        fetchData(); // Refresh task list
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(
        `${apiEndpoint}/api/deletetask/${taskId}`
      );
      if (response.status === 200) {
        console.log("Task deleted");
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const btnhandler = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName: taskName,
      description: description,
    };

    try {
      const response = await axios.post(
        `${apiEndpoint}/api/addtask`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      setTaskName("");
      setDescription("");
      fetchData();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const fetchData = async () => {
    if (token) {
      try {
        const response = await axios.get(`${apiEndpoint}/api/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error);
      }
    } else {
      console.error("Token is missing!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setTaskName(task.taskName);
    setDescription(task.description);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTaskName("");
    setDescription("");
  };

  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <form
          action=""
          name="task-form"
          className="flex flex-col py-10 space-y-4"
        >
          <input
            id="taskName"
            type="text"
            placeholder="Add task"
            className="w-80 h-10 text-center"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            id="description"
            type="text"
            placeholder="Add description"
            className="w-80 h-10 text-center"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={btnhandler}
            className="bg-green-600 w-20 h-10 mx-auto"
          >
            Add
          </button>
        </form>
      </div>

      <div
        className={`task-mapping grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 `}
      >
        {tasks?.map((task) => (
          <div
            className={`${
              task.stasus ? "bg-green-600" : "bg-yellow-400"
            } text-black font-semibold rounded-lg shadow-lg text-center p-20`}
            key={task._id}
            style={{ marginBottom: "1rem" }}
          >
            {editingTaskId === task._id ? (
              <div className="space-y-2 flex flex-col">
                {/* Editable form */}
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder={taskName}
                  className="text-center text-black w-40"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-black text-center w-40 "
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(task._id)}
                    className="bg-blue-600 text-white px-4 py-2"
                  >
                    Save
                  </button>
                  
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-600 text-white px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Static view */}
                <div className="flex-grow">
                  <h3>{task.taskName}</h3>
                  <p>{task.description}</p>
                </div>
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-yellow-500 text-white px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 text-white px-4 py-2"
                >
                  Delete
                </button>
                {task.stasus ?<button
                  onClick={() => handleDone(task._id, false)} // Explicitly pass `true`
                  className="bg-orange-600 text-white px-4 py-2"
                >
                  Cancel
                </button>
                
                : <button
                  onClick={() => handleDone(task._id, true)} // Explicitly pass `true`
                  className="bg-green-600 text-white px-4 py-2"
                >
                  Done
                </button>}
               
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;

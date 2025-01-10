import axios from "axios";
import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskName,setTaskName] =useState("");
  const [description,setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleDone=async(taskId)=>{

  }

  const handleDelete=async(taskId)=>{
    try {
      const response = await axios.delete(`http://localhost:3000/api/deletetask/${taskId}`);
      if(response.status==200){
        console.log(`Task deleted`)
        fetchData();
      }

    } catch (error) {
      if(error.response){
        console.error(error.response.data.message);
        setError(error.response.data.message)
      }else{
        console.error(`error`,error);
        setError("An error has occured")
      }

      
    }
  }
  const btnhandler = async (e) => {
    e.preventDefault();

    const taskData = {
      taskName: taskName,
      description: description,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/addtask",
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
      console.error(err);
    }
  };

  const fetchData = async () => {
    if (token) {
      try {
        console.log("Fetching tasks with token:", token);
        const response = await axios.get("http://localhost:3000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API response:", response);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data || error);
      }
    } else {
      console.error("Token is missing!");
    }
  };

  useEffect(() => {
    

    fetchData(); // Fetch data on component mount
  }, [token]); // Re-run effect only if token changes

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
            onChange={(e)=>{setTaskName(e.target.value)}}
          />
          <input
            id="description"
            type="text"
            placeholder="Add description"
            className="w-80 h-10 text-center"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          />
          <button onClick={btnhandler} className="bg-green-600 w-20 h-10 mx-auto">Add</button>
        </form>
      </div>

      <div className="task-mapping grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
        {tasks?.map((task) => (
          <div className=" bg-slate-900 text-white  rounded-lg shadow-lg text-center p-20 " key={task._id} style={{ marginBottom: "1rem" }}>
            <p className="font-bold text-2xl">{task.taskName}</p>
            <p className=""> {task.description}</p>
            <section className="delete-section flex flex-col pt-4 space-y-4">
          <div className="space-x-4 ">

            <button  className="bg-blue-600 w-12 h-6 mx-auto ">Done</button>
            <button  className="bg-yellow-600 w-12 h-6 mx-auto ">Edit</button>
          </div>
          <button onClick={()=>{handleDelete(task._id)}} className="bg-red-600 w-12 h-6 mx-auto ">Delete</button>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default TaskList;

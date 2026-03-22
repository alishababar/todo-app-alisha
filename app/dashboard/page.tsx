"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import TaskTable from "@/components/ui/dashboard/task-table";
import AddTaskDialog from "@/components/ui/dashboard/add-task-dialog";
import EditTaskDialog from "@/components/ui/dashboard/edit-task-dialog";
import DeleteTaskDialog from "@/components/ui/dashboard/delete-task-dialog";

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}


export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading] = useState(false);


    const [tasks, setTasks] = useState<Task[]>([

 {
    id: 1,
    title: "Grocery Shopping",
    description: "Buy milk, eggs, bread",
    dueDate: "2024-07-20",
  },
  {
    id: 2,
    title: "Project Proposal",
    description: "Draft presentation for client",
    dueDate: "2024-07-25",
  },
  {
    id: 3,
    title: "Gym Workout",
    description: "Full body routine",
    dueDate: "2024-07-19",
  },
      
    ]);

  // ✅ Add Task
  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), ...task },
    ]);
  };

   
  const router = useRouter();

  const handleLogout =  () => {
    localStorage.removeItem("token");
    router.push("/login");
};

  // ✅ Update Task
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // ✅ Delete Task
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className=" bg-blue-50">
      
      <DashboardHeader 
      
      userName="John Doe"

      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading tasks...
          </div>
        ) : (
          <TaskTable
            tasks={tasks}
            onLogout={handleLogout}
            setOpen={setOpen}
            setEditOpen={setEditOpen}
            setSelectedTask={setSelectedTask}
            setDeleteOpen={setDeleteOpen}
          />
        )}

      </main>

      <AddTaskDialog
        open={open}
        setOpen={setOpen}
        addTask={addTask}
      />

      <EditTaskDialog
        open={editOpen}
        setOpen={setEditOpen}
        selectedTask={selectedTask}
        updateTask={updateTask}
      />

      <DeleteTaskDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        selectedTask={selectedTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}
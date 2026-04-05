"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import TaskTable from "@/components/ui/dashboard/task-table";
import AddTaskDialog from "@/components/ui/dashboard/add-task-dialog";
import EditTaskDialog from "@/components/ui/dashboard/edit-task-dialog";
import DeleteTaskDialog from "@/components/ui/dashboard/delete-task-dialog";
import SubscribeSection from "@/components/ui/dashboard/subscribebutton";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export type NewTask = Omit<Task, "id">;

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task: NewTask) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error);
        return;
      }

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (error) {
      console.error(error);
    }
  };
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const deleteTask = (id: number | string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <DashboardHeader />

      <TaskTable
        tasks={tasks}
        setOpen={setOpen}
        setEditOpen={setEditOpen}
        setSelectedTask={setSelectedTask}
        setDeleteOpen={setDeleteOpen}
      />
      <SubscribeSection />

      <AddTaskDialog open={open} setOpen={setOpen} addTask={addTask} />

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

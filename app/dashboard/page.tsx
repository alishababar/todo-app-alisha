"use client";

import { useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

import DashboardHeader from "@/components/ui/dashboard/dashboard-header";
import TaskTable from "@/components/ui/dashboard/task-table";

import AddTaskDialog from "@/components/ui/dashboard/add-task-dialog";
import EditTaskDialog from "@/components/ui/dashboard/edit-task-dialog";
import DeleteTaskDialog from "@/components/ui/dashboard/delete-task-dialog";

import SubscribeSection from "@/components/ui/dashboard/subscribebutton";

import SearchInput from "@/components/tasks/search-input";
import Pagination from "@/components/tasks/pagination";
import SortSelect from "@/components/tasks/sort";
import Filters from "@/components/tasks/task-filter";
import { signOut } from "@/lib/auth-client";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export type NewTask = Omit<Task, "id">;

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());

        const res = await fetch(`/api/tasks?${params.toString()}`);
        if (res.status === 401) {
          window.location.href = "/login";
          return;
          }
        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();

        setTasks(data.tasks);

        setTotalPages(data.totalPages);

        setCurrentPage(data.currentPage);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [searchParams]);

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

      <SearchInput  />

      <Filters />

      <SortSelect />

      <TaskTable
  tasks={tasks}
  setOpen={setOpen}
  setEditOpen={setEditOpen}
  setSelectedTask={setSelectedTask}
  setDeleteOpen={setDeleteOpen}
onLogout={() => signOut("/login")}
/>

      <Pagination currentPage={currentPage} totalPages={totalPages} />

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

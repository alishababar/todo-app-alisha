"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/app/dashboard/page";

interface AddTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: (task: Task) => void;
}

export default function AddTaskDialog({
  open,
  setOpen,
  addTask,
}: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    if (!title || !description || !dueDate) return;

    addTask({
      id: String(Date.now()),
      title,
      description,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold ">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label className="font-bold">Task Title</Label>
            <Input
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold">Description</Label>
            <Input
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="font-bold">Due Date</Label>
            <Input
              type="date"
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <Button
              variant="outline"
              className="rounded-full px-6"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 transition-all duration-300 hover:scale-105"
              onClick={handleSave}
            >
              Save Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

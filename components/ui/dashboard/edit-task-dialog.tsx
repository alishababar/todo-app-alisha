

"use client";

import { useEffect, useState } from "react";
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

interface EditTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | null;
  updateTask: (task: Task) => void;
}

export default function EditTaskDialog({
  open,
  setOpen,
  selectedTask,
  updateTask,
}: EditTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setDueDate(selectedTask.dueDate);
    }
  }, [selectedTask]);

  const handleUpdate = () => {
    if (!selectedTask) return;

    updateTask({
      id: selectedTask.id,
      title,
      description,
      dueDate,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl p-8 shadow-2xl max-w-md">
        
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold text-gray-800">
            Edit Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          
          <div className="space-y-2">
            <Label className="text-2sm ">Task Title</Label>
            <Input
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g, Finish project report"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-2sm">Description</Label>
            <Input
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Complete the final report document,including all data analysis and conclusions, and submit by Friday"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-2sm">Due Date</Label>
            <Input
            placeholder="YYYY-DD"
              className="rounded-xl focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

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
              onClick={handleUpdate}
            >
              Update Task
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
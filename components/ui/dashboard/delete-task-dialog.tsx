            


"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/app/dashboard/page";

interface DeleteTaskDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: Task | null;
  deleteTask: (id: number) => void;
}

export default function DeleteTaskDialog({
  open,
  setOpen,
  selectedTask,
  deleteTask,
}: DeleteTaskDialogProps) {
  if (!selectedTask) return null;

  const handleDelete = () => {
    deleteTask(selectedTask.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl p-8 shadow-2xl max-w-md">
        
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold text-gray-800">
            Delete Task
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-center">          

          <div className="space-y-2">
            <p >
              Are you sure you want to delete this task?
            </p>

            <p className="text-sm text-gray-500 italic">
              "{selectedTask.title}"
            </p>

           
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              className="rounded-full px-6"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              className="bg-red-500 rounded-full hover:bg-red-600 text-white  px-6 transition-all duration-300 hover:scale-105"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
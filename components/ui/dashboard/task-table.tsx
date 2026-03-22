"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/app/dashboard/page";

interface TaskTableProps {
  tasks: Task[] | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;

  
}


export default function TaskTable({
  
  tasks,
  onLogout,
  setOpen,
  setEditOpen,
  setSelectedTask,
  setDeleteOpen,
}: TaskTableProps) {
  return (
    <div className="max-w-5xl mx-auto  pt-3 py-40 bg-blue-50">

      <div className="bg-white shadow-xl pb-6 px-7 w-full max-w-5xl rounded-3xl">

        <div className="flex justify-end gap-2  p-6 ">

          <Button
            className="bg-blue-600 transition-all duration-300 hover:scale-105 flex  hover:bg-blue-700 text-white px-5  py-2 rounded-full"
            onClick={() => setOpen(true)}
          >
             Add Task
          </Button>

          <Button
            onClick={onLogout}
            className="bg-red-400 hover:bg-red-500 text-white rounded-full px-6 transition-all duration-300 hover:scale-105"
          >
           Logout
          </Button>
        </div>

        {/* Table Section */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" font-bold">Task Title</TableHead>
              <TableHead className=" font-bold">Description</TableHead>
              <TableHead className=" font-bold">Due Date</TableHead>
              <TableHead className="text-right  font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
              
  
            {!tasks || tasks.length === 0 ? (
              <TableRow></TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-gray-50 transition">
                  <TableCell className="font-bold">{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                    className="rounded-full hover:bg-black hover:text-white"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                    className="rounded-full bg-red-300 hover:bg-red-600"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedTask(task);
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
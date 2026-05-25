"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(formData: FormData) {
    const status = formData.get("status") as string;
    const priority = formData.get("priority") as string;

    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (priority) {
      params.set("priority", priority);
    } else {
      params.delete("priority");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <form action={handleFilter} className="flex gap-4 mb-4">
      <select
        name="status"
        defaultValue={searchParams.get("status") || ""}
        className="border rounded-md px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        defaultValue={searchParams.get("priority") || ""}
        className="border rounded-md px-3 py-2"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" className="px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
        Apply
      </button>
    </form>
  );
}
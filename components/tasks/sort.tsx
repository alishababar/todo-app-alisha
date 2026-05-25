"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SortSelectProps = {
  defaultValue?: string;
};

export default function SortSelect({ defaultValue }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e.target.value)}
      className="border rounded-md p-1"
    >
      <option value="createdAt_desc">
  Latest
</option>

<option value="createdAt_asc">
  Oldest
</option>

<option value="dueDate_asc">
  Due Date ↑
</option>

<option value="dueDate_desc">
  Due Date ↓
</option>

<option value="priority_asc">
  Priority ↑
</option>

<option value="priority_desc">
  Priority ↓
</option>

<option value="title_asc">
  Title A-Z
</option>

<option value="title_desc">
  Title Z-A
</option>
    </select>
  );
}
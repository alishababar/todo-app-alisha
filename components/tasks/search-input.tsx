"use client";

import { useRouter, useSearchParams } from "next/navigation";

type SearchInputProps = {
  defaultValue?: string;
};

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(formData: FormData) {
    const search = formData.get("search") as string;

    const params = new URLSearchParams(searchParams.toString());

    if (search?.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <form action={handleSearch} className="flex gap-2 mb-4 mt-4 ">
      <input
        type="text"
        name="search"
        placeholder="Search tasks..."
        defaultValue={defaultValue}
        className="border rounded-md  px-3 py-2 w-screen "
      />

      <button type="submit" className="px-4 py-2 rounded-md border hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
        Search
      </button>
    </form>
  );
}
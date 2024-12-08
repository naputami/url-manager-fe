"use client";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "./ui/input"
import { SearchIcon } from "lucide-react"

export const Search = ({ placeholder, query }: { placeholder: string, query: string }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set(query, term);
        } else {
            params.delete(query);
        }

        replace(`${pathname}?${params.toString()}`);

    }, 300)
    return (
        <>
            <div className="relative flex items-center max-w-2xl ">
                <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                    placeholder={placeholder}
                    defaultValue={searchParams.get(query)?.toString()}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    className=" pl-8"
                />
            </div>

        </>
    )
}

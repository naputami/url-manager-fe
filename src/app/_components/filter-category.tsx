'use client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/app/_components/ui/select";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { getCategories } from "../(main)/categories/action";
import { Category } from "@/infrastructure/interfaces/entities";

export const FilterCategory = () => {
    const [categories, setCategories] = useState<Partial<Category>[]>([]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        async function fetchData() {
            const res = await getCategories('');
            setCategories(res.data);
        }
        fetchData();
    }, []);

    const handleChangeFilter = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === "ALL" || !value) {
            params.delete("category");
        } else {
            params.set("category", value);
        }

        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <Select onValueChange={handleChangeFilter} defaultValue={searchParams.get("category")?.toString()}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ALL">All categories</SelectItem>
                {categories.map(category => <SelectItem value={category.id as string} key={category.id}>{category.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}

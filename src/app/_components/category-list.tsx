"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AddCategory } from "./add-category";
import { DeleteCategory } from "./delete-category";
import { EditCategory } from "./edit-category";
import { Search } from "lucide-react";
import { Category } from "@/infrastructure/interfaces/entities";

type CategoryListProps = {
    categories: Partial<Category>[];
}
export function CategortList({ categories }: CategoryListProps) {


    return (
        <div className='space-y-4'>
            <div className='flex justify-between'>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input placeholder="Search ..." />
                    <Button size="icon">
                        <Search />
                    </Button>
                </div>
                <AddCategory />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className='space-x-3'>
                                <EditCategory name={category?.name} categoryId={category?.id} />
                                <DeleteCategory categoryId={category?.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

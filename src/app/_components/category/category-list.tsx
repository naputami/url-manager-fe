"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table";
import { AddCategory } from "./add-category";
import { DeleteCategory } from "./delete-category";
import { EditCategory } from "./edit-category";
import { Category } from "@/infrastructure/interfaces/entities";
import { Suspense } from "react";

type CategoryListProps = {
    categories: Partial<Category>[];
}
export const CategortList = ({ categories }: CategoryListProps) => {
    return (
        <div className='space-y-4'>
            <div className='flex justify-end'>
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
                    {categories.length === 0 && <TableRow><TableCell colSpan={2} className="text-center">No data</TableCell></TableRow>}
                    <Suspense fallback={<TableRow><TableCell colSpan={2}>Loading ...</TableCell></TableRow>}>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className='space-x-3'>
                                <EditCategory name={category?.name} categoryId={category?.id} />
                                <DeleteCategory categoryId={category?.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                    </Suspense>
                </TableBody>
            </Table>
        </div>
    )
}

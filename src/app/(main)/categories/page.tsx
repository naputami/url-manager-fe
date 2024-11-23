import React from 'react'
import { categoryService } from '@/applications/instance'
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Input } from '@/app/_components/ui/input';
import { Edit, Trash, Search, PlusCircleIcon } from "lucide-react";
import { Button } from '@/app/_components/ui/button';


export default async function Page() {
  const session = await cookies();
  console.log(session.toString());
  if (!session.toString()) {
    console.log("no cookies");
    redirect("/login");
  }
  const res = await categoryService.getCategories(session.toString());

  if (res.code === 401) {
    redirect("/login");
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input placeholder="Search ..." />
          <Button size="icon">
            <Search />
          </Button>
        </div>
        <Button>
          <PlusCircleIcon /> Add Category
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {res.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className='space-x-3'>
                <Button variant="secondary" size="icon">
                  <Edit />
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

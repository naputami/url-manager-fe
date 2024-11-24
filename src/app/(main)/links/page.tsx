import { getAllLinkAction } from "./action";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/app/_components/ui/table";
import { Suspense } from "react";
import { AddLink } from "@/app/_components/link/add-link";
import { DeleteLink } from "@/app/_components/link/delete-link";

export default async function Page() {
  const {data} = await getAllLinkAction();

  return (
    <div className="space-y-4">
      <AddLink />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<TableRow><TableCell colSpan={4}>Loading ...</TableCell></TableRow>}>
            {data?.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No data</TableCell></TableRow>}
            {data?.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium"><a href={link.link} className="underline hover:cursor-pointer" target="_blank" rel="noopener noreferrer">{link.title}</a></TableCell>
                <TableCell className="font-medium">{link.summary}</TableCell>
                <TableCell className="font-medium">{link.category?.name}</TableCell>
                <TableCell className='space-x-3'>
                 <DeleteLink linkId={link.id} />
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
    </div>
  )
}

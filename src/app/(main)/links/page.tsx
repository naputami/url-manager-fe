import { getAllLinkAction } from "./action";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/app/_components/ui/table";
import { getSession } from "@/utils/session";
import dynamic from "next/dynamic";

const AddLink = dynamic(() => import('../../_components/link/add-link').then((mod) => mod.AddLink), {
  loading: () => <p>Loading...</p>,
})

const DeleteLink = dynamic(() => import('../../_components/link/delete-link').then((mod) => mod.DeleteLink), {
  loading: () => <p>Loading...</p>,
})

const EditLink = dynamic(() => import('../../_components/link/edit-link').then((mod) => mod.EditLink), {
  loading: () => <p>Loading...</p>,
})

export default async function Page() {
  const { data } = await getAllLinkAction();
  const session = await getSession();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddLink />
      </div>
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
          {data?.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No data</TableCell></TableRow>}
          {data?.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium"><a href={link.link} className="underline hover:cursor-pointer" target="_blank" rel="noopener noreferrer">{link.title}</a></TableCell>
              <TableCell className="font-medium">{link.summary}</TableCell>
              <TableCell className="font-medium">{link.category?.name}</TableCell>
              <TableCell className='space-x-3'>
                <DeleteLink linkId={link.id} />
                <EditLink linkObj={link} session={session} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

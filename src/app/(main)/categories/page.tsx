import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { categoryService } from '@/applications/instance'
import { getSession } from '@/utils/session';
import dynamic from "next/dynamic";

const AddCategory = dynamic(() => import("../../_components/category/add-category").then((mod) => mod.AddCategory), {
  loading: () => <p>Loading...</p>,
})

const EditCategory = dynamic(() => import("../../_components/category/edit-category").then((mod) => mod.EditCategory), {
  loading: () => <p>Loading...</p>,
})

const DeleteCategory = dynamic(() => import("../../_components/category/delete-category").then((mod) => mod.DeleteCategory), {
  loading: () => <p>Loading...</p>,
})



export default async function Page() {
  const session = await getSession();
  const res = await categoryService.getCategories(session);
  const categories = res.data;

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

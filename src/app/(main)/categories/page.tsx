import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Search } from "@/app/_components/search";
import dynamic from "next/dynamic";
import { getCategories } from "./action";

const AddCategory = dynamic(() => import("../../_components/category/add-category").then((mod) => mod.AddCategory), {
  loading: () => <p>Loading...</p>,
})

const EditCategory = dynamic(() => import("../../_components/category/edit-category").then((mod) => mod.EditCategory), {
  loading: () => <p>Loading...</p>,
})

const DeleteCategory = dynamic(() => import("../../_components/category/delete-category").then((mod) => mod.DeleteCategory), {
  loading: () => <p>Loading...</p>,
})



export default async function Page(props: {
  searchParams?: Promise<{
    name?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name || '';
  const res = await getCategories(name);


  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <Search placeholder="Search categories..." query="name" />
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
          {!res.success && <TableRow><TableCell colSpan={2} className="text-center">{res.message}</TableCell></TableRow>}
          {res.success && res.data.length === 0 && <TableRow><TableCell colSpan={2} className="text-center">No data</TableCell></TableRow>}
          {res.success && res.data.length > 0 && res.data.map((category) => (
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

import {
  Card,
} from "@/app/_components/ui/card";
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
      <div className="grid grid-cols-4 gap-4">
      {!res.success && <p>{res.message}</p>}
      {res.success && res.data.length === 0 && <p>No data</p>}
      {res.success && res.data.length > 0 && res.data.map(category => (
        <Card key={category.id} className="p-3">
          <p className="font-medium text-base">{category.name}</p>
          <div className="space-x-2 mt-2">
            <EditCategory name={category?.name} categoryId={category?.id} />
            <DeleteCategory categoryId={category?.id} />
          </div>
        </Card>
      ))}
      </div>      
    </div>
  )
}

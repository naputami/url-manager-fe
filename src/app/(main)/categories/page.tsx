import React from 'react'
import { categoryService } from '@/applications/instance'
import { CategortList } from '@/app/_components/category-list';
import { getSession } from '@/utils/session';


export default async function Page() {
  const session = await getSession();
  const res = await categoryService.getCategories(session);

  return (
   <>
    <CategortList categories={res.data} />
   </>
  )
}

import { CardLatestLink } from "@/app/_components/link/card-latest-link";
import { WelcomeDashboard } from "@/app/_components/welcome-dashboard";
import { getLatestLink } from "./action";
import dynamic from "next/dynamic";

const AddCategory = dynamic(() => import("../../_components/category/add-category").then((mod) => mod.AddCategory), {
    loading: () => <p>Loading...</p>,
})

const AddLink = dynamic(() => import('../../_components/link/add-link').then((mod) => mod.AddLink), {
    loading: () => <p>Loading...</p>,
})

export default async function Page() {
    const res = await getLatestLink();
    return (
        <section className="mt-5">
            <WelcomeDashboard />
            <div className="space-x-2 mt-4">
                <AddCategory />
                <AddLink />
            </div>
            <p className="mt-6 text-lg text-sidebar-primary font-light">Your latest added link</p>
            <div className="grid grid-cols-3 mt-4 gap-4">
                {res.success && res.data.length === 0 && (<p>No link added yet</p>)}
                {res.success && res.data.length > 0 && res.data.map(link => <CardLatestLink key={link.id} link={link} />)}
            </div>
        </section>
    )
}
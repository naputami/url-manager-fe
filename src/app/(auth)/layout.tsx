import Link from "next/link";
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-screen h-screen flex justify-center">
            <div className="w-1/2 bg-primary">
                <Link href="/">
                    <p className="text-primary-foreground text-2xl mt-4 ml-4 font-bold">URL Manager</p>
                </Link>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-primary-foreground">
                {children}
            </div>
        </section>
    )
}
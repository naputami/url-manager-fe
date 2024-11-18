export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="w-screen h-screen flex justify-center">
            <div className="w-1/2 bg-slate-950">
                <p className="text-white text-2xl mt-4 ml-4 font-bold">URL Manager</p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center">
            {children}
            </div>
        </section>
    )
}
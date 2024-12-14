"use client";
import Link from 'next/link';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from './action';
import { useProfileContext } from '@/context/profile';
import { useActionState, startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
    email: z.string().email({ message: "e-mail must be in valid standard e-mail format" }),
    password: z.string().min(4, { message: "password must be at least 4 characters" }).max(20, { message: "Password must me maximum at 20 characters" })
})

export default function Page() {
    const [state, formAction, pending] = useActionState(loginAction, null);
    const router = useRouter();
    const { toast } = useToast();
    const {setProfile} = useProfileContext();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    useEffect(() => {
        if (state?.success) {
            const {data} = state;
            if(data){
                localStorage.setItem("user", JSON.stringify(data));
            }
            setProfile(data);
            router.push("/dashboard");
        } else if(state?.success === false) {
            toast({
                title: "Login Failed",
                description: `${state?.message}`,
                variant: "destructive",
            })
        }
    }, [state]);


    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("password", values.password);
            formData.append("email", values.email);
            formAction(formData);
        })
       
    }


    return (
        <div>
            <h1 className="font-bold text-2xl text-center text-slate">Login Here!</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@mail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={pending}> {pending && <Loader2 className="animate-spin" />}  Submit</Button>
                </form>
            </Form>
            <p className='text-lg mt-4'>Don&apos;t have an account? <Link href="/register" className='text-slate-950 font-semibold'>Register </Link>here.</p>
        </div>
    )
}
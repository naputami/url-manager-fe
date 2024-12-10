"use client";
import Link from 'next/link';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/app/_components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "@/app/_components/ui/input"
import { useToast } from '@/hooks/use-toast';
import { registerAction } from './action';
import { useActionState, useEffect, startTransition } from 'react';

const registerFormSchema = z.object({
    name: z.string().min(3, { message: "name must be at least 3 characters" }).max(50, { message: "name must be maximum 50 caharcters" }),
    email: z.string().email({ message: "e-mail must be in valid standard e-mail format" }),
    password: z.string().min(4, { message: "password must be at least 4 characters" }).max(20, { message: "Password must me maximum at 20 characters" })
})

export default function Page() {
    const [state, formAction, pending] = useActionState(registerAction, null);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    useEffect(() => {
        if (state?.success) {
            toast({
                title:'Registration Success',
                description: `${state?.message}` ,
                variant: 'default',
            })  
        } else if(state?.success === false) {
            toast({
                title: "Registration Failed",
                description: `${state?.message}`,
                variant: "destructive",
            })
        }
    }, [state]);

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("password", values.password);
            formData.append("email", values.email);
            formAction(formData);
        })
    }

    return (<div>
        <h1 className="font-bold text-2xl text-center text-slate">Register Your Account Here!</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
        <p className='text-lg mt-4'>Already have an account? <Link href="/login" className='text-slate-950 font-semibold'>Login </Link>here.</p>
    </div>)
}
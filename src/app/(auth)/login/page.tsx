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

const loginFormSchema = z.object({
    email: z.string().email({ message: "e-mail must be in valid standard e-mail format" }),
    password: z.string().min(4, { message: "password must be at least 4 characters" }).max(20, { message: "Password must me maximum at 20 characters" })
})

export default function Page() {
    const {toast} = useToast();
    const {setProfile} = useProfileContext();
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    async function onSubmit(values: z.infer<typeof loginFormSchema>) {
        const formData = new FormData();
        formData.append("password", values.password);
        formData.append("email", values.email);
        const {success, message, data} = await loginAction(formData);
        if(success){
          setProfile(data);
        } else {
            toast({
                title: "Login Failed",
                description: `${message}`,
                variant: "destructive",
            })
        }
      
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
                     <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}> {form.formState.isSubmitting && <Loader2 className="animate-spin" />}  Submit</Button>
                </form>
            </Form>
            <p className='text-lg mt-4'>Don&apos;t have an account? <Link href="/register" className='text-slate-950 font-semibold'>Register </Link>here.</p>
        </div>
    )
}
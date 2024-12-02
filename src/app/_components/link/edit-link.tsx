"use client";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Edit, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useActionState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { Category, Link } from "@/infrastructure/interfaces/entities"
import { editLinkAction } from "@/app/(main)/links/action";
import { getCategories } from "@/app/(main)/categories/action";


type EditLinkProps = {
    linkObj: Partial<Link>;
}

const editLinkForm = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(50, { message: "Title must be maximum 50 characters" }),
    link: z.string().url({ message: "Link must be in URL valid format" }),
    summary: z.string().min(3).max(100),
    categoryId: z.string(),
    linkId: z.string()
})
export const EditLink = ({ linkObj}: EditLinkProps) => {
    const [state, formAction, pending] = useActionState(editLinkAction, null);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<Partial<Category>[]>([]);
    const form = useForm<z.infer<typeof editLinkForm>>({
        resolver: zodResolver(editLinkForm),
        defaultValues: {
            link: linkObj.link,
            title: linkObj.title,
            summary: linkObj.summary,
            categoryId: linkObj.category?.id,
            linkId: linkObj.id
        },
    });

    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        form.reset({
            link: linkObj.link,
            title: linkObj.title,
            summary: linkObj.summary,
            categoryId: linkObj.category?.id,
            linkId: linkObj.id,
        });
    }, [linkObj, form]);


    useEffect(() => {
        if (state?.success) {
            form.reset();
            router.refresh();
            toast({
                title: "Success!",
                description: "Edit category success",
            })
        } else if (state?.success === false) {
            toast({
                title: "Error!",
                description: `${state?.message}`,
                variant: "destructive"
            })
        }
    }, [state]);

    useEffect(() => {
        async function fetchData(){
            const res = await getCategories();
            setCategories(res.data);
        }
        fetchData();
    }, [])

    function onSubmit(values: z.infer<typeof editLinkForm>) {
        startTransition(() => {
            setOpen(false);
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("link", values.link);
            formData.append("summary", values.summary);
            formData.append("linkId", values.linkId);
            formData.append("categoryId", values.categoryId);
            formAction(formData);
        })
    
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Edit />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title ..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="URL ...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="summary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Summary</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Summary ..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map(category =>  <SelectItem value={category.id as string} key={category.id}>{category.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <input name="linkId" value={linkObj.id} readOnly hidden />
                            <DialogFooter>
                                <Button type="submit" disabled={pending}> {pending && <Loader2 className="animate-spin" />} Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}


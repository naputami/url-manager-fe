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
import { Input } from "@/app/_components/ui/input";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useState, useEffect, startTransition } from "react";
import { useRouter } from 'next/navigation';
import { editCategoryAction } from "../../(main)/categories/action";

type EditCategoryProps = {
    categoryId: string | undefined,
    name: string | undefined
}

const editCategoryForm = z.object({
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }).max(30, {
        message: "Categoty name must be maximum 30 characters"
    }),
    categoryId: z.string({message: "must be string"})
})

export const EditCategory = ({ categoryId, name }: EditCategoryProps) => {
    const [state, formAction, pending] = useActionState(editCategoryAction, null);
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof editCategoryForm>>({
        resolver: zodResolver(editCategoryForm),
        defaultValues: {
            name,
            categoryId
        },
    });
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        form.reset({ name, categoryId });
    }, [name, form, categoryId]);

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

    function onSubmit(values: z.infer<typeof editCategoryForm>) {
      startTransition(async() => {
        setOpen(false);
        const formData = new FormData();
        formData.append("name", values.name);
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
                    <DialogTitle>Edit Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Category name ...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <input name="categoryId" value={categoryId} readOnly hidden />
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

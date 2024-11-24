"use client";
import { Button } from "@/app/_components/ui/button";
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
import { useToast } from "@/hooks/use-toast";
import { PlusCircleIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useActionState, useState, useEffect, startTransition } from "react";
import { useRouter } from 'next/navigation';
import { addNewCategoryAction } from "../../(main)/categories/action";

const categoryForm = z.object({
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }).max(30, {
        message: "Categoty name must be maximum 30 characters"
    }),
})

export const AddCategory = () => {
    const [state, formAction, pending] = useActionState(addNewCategoryAction, null);
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof categoryForm>>({
        resolver: zodResolver(categoryForm),
        defaultValues: {
            name: "",
        },
        mode: "onChange"
    });
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (state?.success) {
            form.reset();
            router.refresh();
            toast({
                title: "Success!",
                description: "Adding new category success",
            })
        } else if (state?.success === false) {
            form.reset();
            toast({
                title: "Error!",
                description: `${state?.message}`,
                variant: "destructive"
            })
        }
    }, [state]);

    function onSubmit(values: z.infer<typeof categoryForm>) {
        startTransition(async () => {
            setOpen(false);
            const formData = new FormData();
            formData.append("name", values.name);
            formAction(formData);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircleIcon /> Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
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

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
import { addLinkAction } from "@/app/(main)/links/action";

const addLinkForm = z.object({
    link: z.string().url({message: "Link must be in valid URL Format"}),
})

export const AddLink = () => {
    const [state, formAction, pending] = useActionState(addLinkAction, null);
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof addLinkForm>>({
        resolver: zodResolver(addLinkForm),
        defaultValues: {
            link: "",
        },
    });
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (state?.success) {
            form.reset();
            router.refresh();
            toast({
                title: "Success!",
                description: "Adding link success",
            })
        } else if (state?.success === false) {
            toast({
                title: "Error!",
                description: `${state?.message}`,
                variant: "destructive"
            })
        }
    }, [state]);

    function onSubmit(values: z.infer<typeof addLinkForm>) {
        startTransition(async () => {
            setOpen(false);
            const formData = new FormData();
            formData.append("link", values.link);
            formAction(formData);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircleIcon /> Add Link
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Link</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="URL ...." {...field} />
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

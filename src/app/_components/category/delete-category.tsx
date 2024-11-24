"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { deleteCategoryAction } from "../../(main)/categories/action";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useActionState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type DeleteCategoryProps = {
    categoryId: string | undefined,
}

export function DeleteCategory({ categoryId }: DeleteCategoryProps) {
    const [state, formData, pending] = useActionState(deleteCategoryAction, null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.refresh();
            toast({
                title: "Success!",
                description: `Category ${state.data.name} is successfully deleted`,
            })
        } else if (state?.success === false) {
            toast({
                title: "Error!",
                description: `${state?.message}`,
                variant: "destructive"
            })
        }
    }, [state]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon"><Trash /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        All links associated with this category will also be deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={formData}>
                        <input name="categoryId" value={categoryId} readOnly hidden />
                        <AlertDialogAction type="submit" disabled={pending}>  {pending && <Loader2 className="animate-spin" />} Continue</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

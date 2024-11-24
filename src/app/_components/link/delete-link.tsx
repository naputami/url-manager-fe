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
import { deleteLinkAction } from "@/app/(main)/links/action";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useActionState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type DeleteLinkProps = {
    linkId: string | undefined,
}


export function DeleteLink({linkId}: DeleteLinkProps) {
    const [state, formData, pending] = useActionState(deleteLinkAction, null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.refresh();
            toast({
                title: "Success!",
                description: `Link ${state.data.title} is successfully deleted`,
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
                       This link will be removed from database. This action can&apos;t be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={formData}>
                        <input name="linkId" value={linkId} readOnly hidden />
                        <AlertDialogAction type="submit" disabled={pending}>  {pending && <Loader2 className="animate-spin" />} Continue</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

"use client"

import { authClient } from "@/lib/auth-client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog"

import { AuthClient } from "better-auth/react"
type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const UpgradeModal = ({
    open,
    onOpenChange,
}: Props) => {


    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upgrade</AlertDialogTitle>
                    <AlertDialogDescription>
                        Upgrade to access premium features
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => authClient.checkout({
                        slug: "Mariachon-Pro",
                    })}>Upgrade</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
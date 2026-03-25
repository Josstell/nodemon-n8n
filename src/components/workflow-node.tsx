"use client"

import { NodeToolbar, Position } from "@xyflow/react"
import { SettingsIcon, TrashIcon } from "lucide-react"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

interface WorkflowNodeProps {
    children: ReactNode
    showtoolbar?: boolean
    onDelete: () => void
    onSettings: () => void
    name: string
    description: string
}

export function WorkflowNode({
    children,
    showtoolbar = true,
    onDelete,
    onSettings,
    name,
    description,
}: WorkflowNodeProps) {
    return (
        <>
            {showtoolbar && (
                <NodeToolbar
                    position={Position.Top}
                    className="flex items-center gap-2 bg-background p-2 rounded-lg shadow-lg border border-border"
                >
                    <Button variant="ghost" size="sm" onClick={onSettings}>
                        <SettingsIcon className="size-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onDelete}>
                        <TrashIcon className="size-4" />
                    </Button>
                </NodeToolbar>
            )}
            {children}
            {
                name && (
                    <NodeToolbar
                        position={Position.Bottom}
                        isVisible
                        className="max-w-[200px] test-center"
                    >
                        <p className=" font-medium">{name}</p>
                        {description && (
                            <p className="text-muted-foreground truncate text-sm">{description}</p>
                        )}
                    </NodeToolbar>
                )
            }
        </>
    )
}
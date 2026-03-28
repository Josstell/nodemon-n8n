"use client"

import { createId } from "@paralleldrive/cuid2"
import { GlobeIcon, MousePointer } from "lucide-react"
import { useCallback } from "react"
import { toast } from "sonner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"

import { NodeType } from "@/generated/prisma/enums"
import { Separator } from "@/components/ui/separator"
import { useReactFlow } from "@xyflow/react"

export type NodeTypeOption = {
    type: NodeType
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }> | string
}

const triggerNodes: NodeTypeOption[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Manual Trigger",
        description: "Runs the flow on clicking the button",
        icon: MousePointer
    },

]


const executionNodes: NodeTypeOption[] = [

    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Runs the flow on clicking the button",
        icon: GlobeIcon
    }
]


interface NodeSelectorProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

export function NodeSelector({ open, onOpenChange, children }: NodeSelectorProps) {
    const { setNodes, getNodes, screenToFlowPosition } = useReactFlow()

    const handleNodeSelect = useCallback((selection: NodeTypeOption) => {

        if (selection.type === NodeType.MANUAL_TRIGGER) {
            const nodes = getNodes()
            const hasManuallyTrigger = nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER)
            if (hasManuallyTrigger) {
                toast.error("Manual trigger already exists Only one manual trigger is allowed ")
                return
            }

        }
        setNodes((nodes) => {
            const hasInitialNode = nodes.some((node) => node.type === NodeType.INITIAL)

            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            const flowPosition = screenToFlowPosition(
                {
                    x: centerX + (Math.random() - 0.5) * 200,
                    y: centerY + (Math.random() - 0.5) * 200
                })

            const newNode = {
                id: createId(),
                position: flowPosition,
                type: selection.type,
                data: {},
            }
            if (hasInitialNode) {
                return [newNode]
            }
            return [...nodes, newNode]
        }
        )
        onOpenChange(false)
    }, [getNodes, setNodes, screenToFlowPosition, onOpenChange])


    const onAddNode = useCallback((nodeType: NodeType) => {
        const id = createId()
        const position = screenToFlowPosition({
            x: 100,
            y: 100,
        })
        const newNode = {
            id,
            position,
            type: nodeType,
            data: { label: nodeType },
        }
        setNodes((nodes) => [...nodes, newNode])
    }, [setNodes, screenToFlowPosition])
    return <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
                <SheetTitle>what triggers this workflow?</SheetTitle>
                <SheetDescription>
                    A trigger is a step that starts the workflow.
                </SheetDescription>
            </SheetHeader>
            <Separator />
            <div className="flex flex-col gap-2 mt-4">
                {triggerNodes.map((nodeType) => {
                    const Icon = nodeType.icon
                    return (
                        <div key={nodeType.type} className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-2 hover:border-primary hover:bg-primary/10" onClick={() => handleNodeSelect(nodeType)}>
                            <div className="flex items-center gap-6 w-full overflow-hidden">
                                {
                                    typeof Icon === "string" ? (
                                        <img src={Icon} alt={nodeType.label} className="size-5 object-contain rounded-sm" />
                                    ) : (
                                        <Icon className="size-5 " />
                                    )
                                }
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium">{nodeType.label}</span>
                                    <span className="text-xs text-muted-foreground">{nodeType.description}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Separator />
            <div className="flex flex-col gap-2 mt-4">
                {executionNodes.map((nodeType) => {
                    const Icon = nodeType.icon
                    return (
                        <div key={nodeType.type} className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-2 hover:border-primary hover:bg-primary/10" onClick={() => handleNodeSelect(nodeType)}>
                            <div className="flex items-center gap-6 w-full overflow-hidden">
                                {
                                    typeof Icon === "string" ? (
                                        <img src={Icon} alt={nodeType.label} className="size-5 object-contain rounded-sm" />
                                    ) : (
                                        <Icon className="size-5 " />
                                    )
                                }
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-sm font-medium">{nodeType.label}</span>
                                    <span className="text-xs text-muted-foreground">{nodeType.description}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </SheetContent>
    </Sheet>
}

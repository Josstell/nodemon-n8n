"use client"

import type { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./workflow-node"
import { NodeSelector } from "./node-selector"

export const InitialNode = memo((props: NodeProps) => {
    const [selectorOpen, setSelectorOpen] = useState(false)
    return <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
        <WorkflowNode showtoolbar={false} name="Initial Node" description="Initial Node" onDelete={() => { }} onSettings={() => { }} >

            <PlaceholderNode {...props} onClick={() => setSelectorOpen(true)}  >
                <div className="flex items-center justify-center cursor-pointer">
                    <PlusIcon className="size-4" />
                </div>
            </PlaceholderNode>
        </WorkflowNode>
    </NodeSelector>
})
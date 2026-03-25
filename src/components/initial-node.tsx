"use client"

import type { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./workflow-node"

export const InitialNode = memo((props: NodeProps) => {
    return <WorkflowNode onDelete={() => { }} onSettings={() => { }} name="Initial Node" description="Initial Node" >

        <PlaceholderNode {...props} >
            <div className="flex items-center justify-center cursor-pointer">
                <PlusIcon className="size-4" />
            </div>
        </PlaceholderNode>
    </WorkflowNode>
})
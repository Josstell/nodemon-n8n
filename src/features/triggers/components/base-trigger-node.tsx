"use client"

import { type NodeProps, Position } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"

import Image from "next/image"
import { memo, type ReactNode, useCallback } from "react"

import { BaseNode, BaseNodeContent } from "@/components/base-node"
import { BaseHandle } from "@/components/base-handle"
import { WorkflowNode } from "@/components/workflow-node"


interface BaseTriggerNodeProps extends NodeProps {
    icon: LucideIcon
    name: string
    description: string
    children: ReactNode
    // status: NodeStatus
    onSettings: () => void
    onDoubleClick: () => void
}


export const BaseTriggerNode = memo(
    ({ id, icon: Icon, name, description, children, onSettings, onDoubleClick }: BaseTriggerNodeProps) => {

        const handleDelete = () => {

        }

        return (
            <WorkflowNode
                name={name}
                description={description}
                onSettings={onSettings}
                onDelete={handleDelete}
            >
                <BaseNode onDoubleClick={onDoubleClick} className="rounded-l-2xl relative group">
                    <BaseNodeContent>
                        {
                            typeof Icon === "string" ? (
                                <img src={Icon} alt={name} width={16} height={16} />
                            ) : (
                                <Icon className="size-4 text-muted-foreground " />
                            )
                        }
                        {children}
                        <BaseHandle type="source" position={Position.Right} id="source-1" />
                    </BaseNodeContent>
                </BaseNode>
            </WorkflowNode>
        )
    }
)

BaseTriggerNode.displayName = "BaseTriggerNode"



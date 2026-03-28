"use client"

import { type NodeProps, Position } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"

import Image from "next/image"
import { memo, type ReactNode, useCallback } from "react"

import { BaseNode, BaseNodeContent } from "@/components/base-node"
import { BaseHandle } from "@/components/base-handle"
import { WorkflowNode } from "@/components/workflow-node"


interface BaseExecutionNodeProps extends NodeProps {
    icon: LucideIcon
    name: string
    description: string
    children: ReactNode
    // status: NodeStatus
    onSettings: () => void
    onDoubleClick: () => void
}


export const BaseExecutionNode = memo(
    ({ id, icon: Icon, name, description, children, onSettings, onDoubleClick }: BaseExecutionNodeProps) => {

        const handleDelete = () => {

        }

        return (
            <WorkflowNode
                name={name}
                description={description}
                onSettings={onSettings}
                onDelete={handleDelete}
            >
                <BaseNode onDoubleClick={onDoubleClick}>
                    <BaseNodeContent>
                        {
                            typeof Icon === "string" ? (
                                <img src={Icon} alt={name} width={16} height={16} />
                            ) : (
                                <Icon className="size-4 text-muted-foreground " />
                            )
                        }
                        {children}
                        <BaseHandle type="target" position={Position.Left} id="target-1" />
                        <BaseHandle type="source" position={Position.Right} id="source-1" />
                    </BaseNodeContent>
                </BaseNode>
            </WorkflowNode>
        )
    }
)

BaseExecutionNode.displayName = "BaseExecutionNode"



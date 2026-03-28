import { NodeProps } from "@xyflow/react"
import { memo } from "react"
import { BaseTriggerNode } from "../components/base-trigger-node"
import { MousePointerIcon } from "lucide-react"

export const ManualTriggerNode = memo((props: NodeProps) => {
    return (
        <>

            <BaseTriggerNode
                children={undefined} {...props}
                icon={MousePointerIcon}
                name="When clicking Execute workflow"
                description="Manual Trigger"
                onSettings={() => { }}
                onDoubleClick={() => { }}
            />
        </>

    )
})
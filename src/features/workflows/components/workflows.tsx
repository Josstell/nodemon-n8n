"use client"


import { formatDistanceToNow } from "date-fns"
import { EntityContainer, EntityEmpty, EntityHeader, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-component"
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVerticalIcon, TrashIcon, WorkflowIcon } from "lucide-react"

import type {
    Workflow
} from "@/generated/prisma/client"

export const WorkflowsSearch = () => {
    const [params, setParams] = useWorkflowsParams()
    const { searchValue, onSearchChange } = useEntitySearch({
        params, setParams
    })
    return <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows" />
}

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows()

    return (
        <EntityList
            items={workflows.data.items}
            renderItem={(workflow) => (
                <WorkflowItem data={workflow} />
            )}
            getKey={(workflow) => workflow.id}
            emptyView={<WorkflowsEmpty />}
        />
    )
}

export const WorkFlowsHeader = ({ disabled }: { disabled: boolean }) => {

    const createWorkflow = useCreateWorkflow()
    const router = useRouter()
    const { handleError, modal } = useUpgradeModal()

    const handleCreateWorkflow = () => {
        createWorkflow.mutate(undefined, {
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            },
            onError: (error) => {
                handleError(error)
            }
        })
    }
    return (
        <>
            {modal}
            <EntityHeader
                title="Workflows"
                description="Create and manage your workflows"
                newButtonLabel="New Workflow"
                isCreating={createWorkflow.isPending}
                disabled={disabled}
                onNew={handleCreateWorkflow}
            />
        </>
    )
}

export const WorkFlowsPagination = () => {
    const workflows = useSuspenseWorkflows()
    const [params, setParams] = useWorkflowsParams()
    return (
        <EntityPagination
            page={workflows.data.page}
            totalPage={workflows.data.totalPages}
            onPageChange={(page) => setParams({ ...params, page })}
            disabled={workflows.isFetching}
        />
    )
}

export const WorkflowsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <EntityContainer
            header={<WorkFlowsHeader disabled={false} />}
            search={<WorkflowsSearch />}
            pagination={<WorkFlowsPagination />}
        >
            {children}
        </EntityContainer>

    )
}

export const WorkflowsLoading = () => {
    return (

        <LoadingView message="Loading workflows..." />
    )
}


export const WorkflowsError = () => {
    return (
        <ErrorView message="Failed to load workflows" />
    )
}


export const WorkflowsEmpty = () => {
    const createWorkflow = useCreateWorkflow()
    const { handleError, modal } = useUpgradeModal()
    const router = useRouter()

    const handleCreateWorkflow = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error)
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data.id}`)
            }
        })
    }
    return (
        <>
            {modal}
            <EntityEmpty
                onNew={handleCreateWorkflow}
                message="You haven't created any workflows yet Get started by creating one" />
        </>
    )
}

interface EntityItemProps {
    href: string
    title: string
    subtitle?: React.ReactNode
    image?: React.ReactNode
    actions?: React.ReactNode
    onRemove?: () => void | Promise<void>
    isRemoving?: boolean
    className?: string

}

export const EntityItem = ({
    href,
    title,
    subtitle,
    image,
    actions,
    onRemove,
    isRemoving,
    className
}: EntityItemProps) => {

    const handleRemove = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (isRemoving) return
        if (onRemove) {
            await onRemove()
        }
    }
    return (
        <Link href={href} prefetch>
            <Card className={cn("p-4 shadow-none hover:shadow cursor-pointer", isRemoving && "opacity-50 cursor-not-allowed", className)}>

                <CardContent className="flex flex-row items-center justify-between p-0">
                    <div className="flex items-center gap-3">
                        {image}
                        <div>
                            <CardTitle className="text-base font-medium">{title}</CardTitle>
                            {!!subtitle && <CardDescription className="text-xs">{subtitle}</CardDescription>}
                        </div>
                    </div>
                    {
                        (actions || onRemove) && (
                            <div className="flex items-center gap-x-4">
                                {actions}
                                {!!onRemove && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => e.stopPropagation()}
                                                disabled={isRemoving}
                                            >
                                                <MoreVerticalIcon className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                                            <DropdownMenuItem onClick={handleRemove}> <TrashIcon className="size-4" /> Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        )
                    }
                </CardContent>
            </Card>

        </Link>
    )
}



export const WorkflowItem = ({ data }: { data: Workflow }) => {
    const removeWorkflow = useRemoveWorkflow()
    const handleRemove = () => {
        removeWorkflow.mutate({ id: data.id })
    }
    return (
        <EntityItem
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={<>Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })} &bull; Created {formatDistanceToNow(data.createdAt, { addSuffix: true })}</>}
            image={<div className="size-8 bg-muted rounded-md flex items-center justify-center"><WorkflowIcon className="size-5 text-muted-foreground" /></div>}
            onRemove={handleRemove}
            isRemoving={removeWorkflow.isPending}
        />
    )
}
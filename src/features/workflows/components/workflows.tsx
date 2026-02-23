"use client"

import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-component"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { toast } from "sonner"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"

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
        <div>
            <h1>Workflows</h1>
            {JSON.stringify(workflows.data, null, 2)}
        </div>
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


import React from 'react'
import { Button } from './ui/button'
import { AlertTriangleIcon, ChevronLeftIcon, ChevronRightIcon, Loader2Icon, PackageOpenIcon, PlusIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { Input } from './ui/input'

import {
    Empty,
    EmptyContent,
    EmptyTitle,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia
} from './ui/empty'
import { cn } from '@/lib/utils'

type Props = {
    title: string
    description?: string
    newButtonLabel: string
    disabled?: boolean
    isCreating?: boolean
} & (
        | { onNew: () => void, newButtonHref?: never }
        | { newButtonHref?: string, onNew?: never }
        | { onNew?: never, newButtonHref?: never }
    )

export const EntityHeader = ({
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonHref,
}: Props) => {
    return (
        <div className='flex flex-row items-center justify-between gap-x-4'>
            <div className='flex flex-col'>
                <h1 className='text-lg md:text-xl font-semibold'>{title}</h1>
                {
                    description && (
                        <p className='text-xs md:text-sm text-muted-foreground'>{description}</p>
                    )
                }
            </div>
            {onNew && !newButtonHref && (
                <Button
                    onClick={onNew}
                    disabled={disabled || isCreating}
                    size="sm"
                >

                    <PlusIcon className='size-4' />
                    {newButtonLabel}
                </Button>
            )}
            {newButtonHref && !onNew && (
                <Button
                    size="sm"
                    asChild
                >
                    <Link href={newButtonHref} prefetch>
                        <PlusIcon className='size-4' />
                        {newButtonLabel}
                    </Link>
                </Button>
            )}
        </div>
    )
}

type EntityContainerProps = {
    header: React.ReactNode
    search: React.ReactNode
    pagination: React.ReactNode
    children: React.ReactNode
}


export const EntityContainer = ({
    header,
    search,
    pagination,
    children,
}: EntityContainerProps) => {
    return (
        <div className='p-4 md:px-10 md:py-6 h-full'>
            <div className='mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full'>
                {header}
                <div className='flex flex-col gap-y-4 h-full'>
                    {search}
                    {children}
                </div>
                {pagination}
            </div>
        </div>
    )
}

interface EntitySearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

export const EntitySearch = ({ value,
    onChange,
    placeholder = "Search"

}: EntitySearchProps) => {
    return <div className='relative ml-auto'>
        <SearchIcon className='size-3.5 absolute left-3 top-1/2
        -translate-y-1/2 text muted/foreground' />
        <Input className='max-w-[200px] bg-background 
        shadow-one border-border pl-8'
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />

    </div>
}


interface EntityPaginationProps {
    page: number
    totalPage: number
    onPageChange: (page: number) => void
    disabled?: boolean
}

export const EntityPagination = ({
    page,
    totalPage,
    onPageChange,
    disabled
}: EntityPaginationProps) => {
    return (
        <div className='flex items-center gap-x-2 justify-between w-full'>
            <div className='flex-1 text-sm text-muted-foreground'>
                Page {page} of {totalPage || 1}
            </div>
            <div className='flez items-center justify-end space-x-2 py-4'>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    disabled={page === 1 || disabled}
                >
                    <ChevronLeftIcon className='size-4' />
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPage, page + 1))}
                    disabled={page === totalPage || totalPage == 0 || disabled}
                >
                    Next
                    <ChevronRightIcon className='size-4' />
                </Button>
            </div>
        </div>

    )
}



interface StateViewProps {
    message?: string
}



export const LoadingView = ({ message }: StateViewProps) => {
    return (
        <div className='flex items-center justify-center h-full flex-1 flex-col gap-y-4'>
            <div className='flex flex-col items-center gap-y-2'>
                <Loader2Icon className='size-6 animate-spin' />
                {!!message && <p className='text-sm md:text-base text-primary'>{message}</p>}
            </div>
        </div>
    )
}

export const ErrorView = ({ message }: StateViewProps) => {
    return (
        <div className='flex items-center justify-center h-full flex-1 flex-col gap-y-4'>
            <div className='flex flex-col items-center gap-y-2'>
                <AlertTriangleIcon className='size-6 text-destructive' />
                {!!message && <p className='text-sm md:text-base text-destructive'>{message}</p>}
            </div>
        </div>
    )
}


interface EntityEmptyProps extends StateViewProps {
    onNew?: () => void
}

export const EntityEmpty = ({
    message,
    onNew
}: EntityEmptyProps) => {
    return (
        <Empty className='border border-dashed bg-white'>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <PackageOpenIcon />
                </EmptyMedia>
            </EmptyHeader>
            <EmptyTitle>No items</EmptyTitle>
            <EmptyDescription>
                {message}
            </EmptyDescription>
            {
                !!onNew && (
                    <EmptyContent>
                        <Button onClick={onNew}>Add new</Button>
                    </EmptyContent>
                )
            }
        </Empty>
    )
}


interface EntityListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
    getKey: (item: T, index: number) => string | number
    emptyView?: React.ReactNode
    className?: string
}

export const EntityList = <T,>({ items, renderItem, getKey, emptyView, className }: EntityListProps<T>) => {
    if (items.length === 0 && emptyView) {
        return <div className="flex-1 flex items-center justify-center">
            <div className="mx-w-sm mx-auto">
                {emptyView}
            </div>
        </div>
    }
    return (
        <div className={cn("flex flex-col gap-y-4", className)}>
            {items.map((item, index) => (
                <div key={getKey(item, index)}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    )
}
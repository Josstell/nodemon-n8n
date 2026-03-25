"use client";

import React, { forwardRef, useCallback, type ReactNode } from "react";
import {
  useReactFlow,
  useNodeId,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import { BaseNode } from "@/components/base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
  onClick?: () => void;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
  ({ children, onClick }, ref) => {

    return (
      <BaseNode
        ref={ref}
        className="w-auto h-auto border-dashed border-gray-400 bg-card p-4 text-center text-gray-400 
        shadow-none cursor-pointer hover:border-gray-600 hover:text-gray-600 transition-colors"
        onClick={onClick}
      >
        {children}
        <Handle
          type="target"
          style={{ visibility: "hidden" }}
          position={Position.Top}
          isConnectable={false}
        />
        <Handle
          type="source"
          style={{ visibility: "hidden" }}
          position={Position.Bottom}
          isConnectable={false}
        />
      </BaseNode>
    );
  }
)
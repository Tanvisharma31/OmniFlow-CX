'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    ReactFlowProvider,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowPropertiesPanel from './FlowPropertiesPanel';

const defaultNodes = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Start' }, type: 'input' },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'Intent: Order Status' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Intent: Tech Support' } },
];
const defaultEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' }
];

interface FlowBuilderProps {
    initialNodes?: any[];
    initialEdges?: any[];
    onSave?: (nodes: any[], edges: any[]) => void;
}

function FlowBuilderContent({ initialNodes = defaultNodes, initialEdges = defaultEdges, onSave }: FlowBuilderProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { toObject } = useReactFlow();
    const [selectedNode, setSelectedNode] = useState<any>(null);

    useEffect(() => {
        if (initialNodes && initialNodes.length > 0) {
            setNodes(initialNodes);
        }
        if (initialEdges && initialEdges.length > 0) {
            setEdges(initialEdges);
        }
    }, [initialNodes, initialEdges, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
        setSelectedNode(node);
    }, []);

    const handleNodeUpdate = (nodeId: string, data: any) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, data };
                }
                return node;
            })
        );
        setSelectedNode(null); // Close panel after save
    };

    useEffect(() => {
        const handleSave = () => {
            const flow = toObject();
            if (onSave) {
                onSave(flow.nodes, flow.edges);
            }
        };

        window.addEventListener('SAVE_FLOW', handleSave);
        return () => window.removeEventListener('SAVE_FLOW', handleSave);
    }, [toObject, onSave]);

    const miniMapStyle = React.useMemo(() => ({ background: '#2a2a3e' }), []);

    const handleAddNode = () => {
        const id = (nodes.length + 1).toString();
        const newNode = {
            id,
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            data: { label: `New Node ${id}` },
        };
        setNodes((nds) => nds.concat(newNode));
    };

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '600px', background: '#1a1a2e', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
                <button
                    onClick={handleAddNode}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                    + Add Node
                </button>
            </div>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
            >
                <Controls />
                <MiniMap style={miniMapStyle} nodeColor="#6366f1" />
                <Background color="#aaa" gap={16} />
            </ReactFlow>

            <FlowPropertiesPanel
                selectedNode={selectedNode}
                onClose={() => setSelectedNode(null)}
                onUpdate={handleNodeUpdate}
            />
        </div>
    );
}

export default function FlowBuilder(props: FlowBuilderProps) {
    return (
        <ReactFlowProvider>
            <FlowBuilderContent {...props} />
        </ReactFlowProvider>
    );
}

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { RotateCcw, Target, Zap } from 'lucide-react';

interface SkillNodeData {
  label: string;
  level: number;
  maxLevel: number;
  unlocked: boolean;
  description: string;
  type: 'skill' | 'quest' | 'milestone';
}

const SkillNode = ({ data }: { data: SkillNodeData }) => {
  const { label, level, maxLevel, unlocked, description, type } = data;
  
  return (
    <div className={`skill-node ${type} ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="skill-icon">
        {type === 'quest' ? <Target className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
      </div>
      <div className="skill-info">
        <div className="skill-name">{label}</div>
        <div className="skill-level">{level}/{maxLevel}</div>
      </div>
      <div className="skill-progress">
        <div 
          className="skill-progress-fill"
          style={{ width: `${(level / maxLevel) * 100}%` }}
        />
      </div>
    </div>
  );
};

const nodeTypes = {
  skillNode: SkillNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'skillNode',
    position: { x: 250, y: 50 },
    data: {
      label: 'Student Foundation',
      level: 1,
      maxLevel: 10,
      unlocked: true,
      description: 'Basic learning skills',
      type: 'skill'
    },
  },
  {
    id: '2',
    type: 'skillNode',
    position: { x: 100, y: 150 },
    data: {
      label: 'Academic Excellence',
      level: 0,
      maxLevel: 15,
      unlocked: false,
      description: 'Advanced study techniques',
      type: 'skill'
    },
  },
  {
    id: '3',
    type: 'skillNode',
    position: { x: 400, y: 150 },
    data: {
      label: 'Time Mastery',
      level: 0,
      maxLevel: 12,
      unlocked: false,
      description: 'Efficient time management',
      type: 'skill'
    },
  },
  {
    id: '4',
    type: 'skillNode',
    position: { x: 250, y: 250 },
    data: {
      label: 'Health & Fitness',
      level: 0,
      maxLevel: 20,
      unlocked: false,
      description: 'Physical development',
      type: 'skill'
    },
  },
  {
    id: '5',
    type: 'skillNode',
    position: { x: 50, y: 350 },
    data: {
      label: 'Research Master',
      level: 0,
      maxLevel: 8,
      unlocked: false,
      description: 'Advanced research abilities',
      type: 'quest'
    },
  },
  {
    id: '6',
    type: 'skillNode',
    position: { x: 450, y: 350 },
    data: {
      label: 'Leadership',
      level: 0,
      maxLevel: 10,
      unlocked: false,
      description: 'Team management skills',
      type: 'quest'
    },
  },
  {
    id: '7',
    type: 'skillNode',
    position: { x: 250, y: 450 },
    data: {
      label: 'Ultimate Scholar',
      level: 0,
      maxLevel: 1,
      unlocked: false,
      description: 'Final evolution',
      type: 'milestone'
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#f59e0b', strokeWidth: 3 },
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#f59e0b', strokeWidth: 3 },
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#f59e0b', strokeWidth: 3 },
  },
];

export const SkillTree: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const resetTree = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  return (
    <div className="skill-tree-container">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-orbitron font-bold neon-text">Progression Tree</h2>
          <p className="text-sm text-muted-foreground">Character development path</p>
        </div>
        <Button
          onClick={resetTree}
          variant="outline"
          size="sm"
          className="system-btn"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <div className="skill-tree-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          className="react-flow-dark"
        >
          <Controls className="react-flow-controls" />
          <Background 
            gap={20} 
            size={1} 
            color="rgba(59, 130, 246, 0.2)"
          />
          <MiniMap 
            className="react-flow-minimap"
            nodeColor={(node) => {
              if (node.data.type === 'milestone') return '#f59e0b';
              if (node.data.type === 'quest') return '#8b5cf6';
              return '#3b82f6';
            }}
          />
        </ReactFlow>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .skill-tree-container {
          height: 500px;
          width: 100%;
          position: relative;
        }
        
        .skill-tree-flow {
          height: 450px;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .skill-node {
          background: rgba(15, 23, 42, 0.9);
          border: 2px solid rgba(59, 130, 246, 0.5);
          border-radius: 8px;
          padding: 8px;
          min-width: 120px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .skill-node.unlocked {
          border-color: rgba(34, 197, 94, 0.7);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        
        .skill-node.locked {
          opacity: 0.6;
          border-color: rgba(107, 114, 128, 0.5);
        }
        
        .skill-node.quest {
          border-color: rgba(139, 92, 246, 0.7);
        }
        
        .skill-node.milestone {
          border-color: rgba(245, 158, 11, 0.7);
          background: rgba(245, 158, 11, 0.1);
        }
        
        .skill-icon {
          display: flex;
          justify-content: center;
          color: rgba(59, 130, 246, 0.8);
          margin-bottom: 4px;
        }
        
        .skill-info {
          text-align: center;
          margin-bottom: 6px;
        }
        
        .skill-name {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2px;
        }
        
        .skill-level {
          font-size: 10px;
          color: rgba(59, 130, 246, 0.8);
          font-family: 'Orbitron', monospace;
        }
        
        .skill-progress {
          height: 3px;
          background: rgba(55, 65, 81, 0.8);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .skill-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(34, 197, 94, 0.8));
          transition: width 0.3s ease;
        }
        
        .react-flow-controls {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        
        .react-flow-minimap {
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        `
      }} />
    </div>
  );
};
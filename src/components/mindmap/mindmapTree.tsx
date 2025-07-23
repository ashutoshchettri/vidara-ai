'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import Tree, { RawNodeDatum, CustomNodeElementProps } from 'react-d3-tree';

type Props = {
  data: any; // Mindmap JSON
};

const NODE_WIDTH = 220;
const NODE_HEIGHT = 70;
const TEXT_PADDING = 12;

export default function MindmapTree({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // Format your nested JSON data for d3-tree
  const formattedData: RawNodeDatum = useMemo(() => {
    const formatNode = (node: any): RawNodeDatum => ({
      name: node.topic,
      children: node.branches?.map(formatNode) || [],
    });
    return formatNode(data);
  }, [data]);

  // Center the tree in container
  useEffect(() => {
    const dimensions = containerRef.current?.getBoundingClientRect();
    if (dimensions) {
      setTranslate({ x: dimensions.width / 2, y: 100 });
    }
  }, []);

  // Custom node renderer with better styling
  const renderRectSvgNode = ({
    nodeDatum,
    toggleNode,
  }: CustomNodeElementProps) => {
    return (
      <g>
        {/* Background rectangle with shadow */}
        <rect
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          x={-NODE_WIDTH / 2}
          y={-NODE_HEIGHT / 2}
          fill="#2563eb" // blue-600
          stroke="#1e40af" // blue-900
          strokeWidth={2}
          rx={12}
          ry={12}
          style={{ cursor: 'pointer', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.1))' }}
          onClick={toggleNode}
          onMouseEnter={(e) => {
            (e.currentTarget as SVGRectElement).style.fill = '#1e40af'; // darker on hover
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as SVGRectElement).style.fill = '#2563eb';
          }}
        />
        {/* Text: multi-line, centered, wrapping */}
        <foreignObject
          width={NODE_WIDTH - TEXT_PADDING * 2}
          height={NODE_HEIGHT - TEXT_PADDING * 2}
          x={- (NODE_WIDTH / 2) + TEXT_PADDING}
          y={- (NODE_HEIGHT / 2) + TEXT_PADDING}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '1.3',
              wordWrap: 'break-word',
              textAlign: 'center',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'normal',
            }}
            title={nodeDatum.name}
          >
            {nodeDatum.name}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        border: '1px solid #e2e8f0', // gray-300
        borderRadius: '12px',
        background: 'white',
        overflow: 'auto',
        padding: '16px',
      }}
    >
      <Tree
        data={formattedData}
        translate={translate}
        orientation="vertical"
        pathFunc="step"
        collapsible
        zoomable
        initialDepth={2}
        separation={{ siblings: 2.5, nonSiblings: 3.5 }}
        nodeSize={{ x: NODE_WIDTH + 70, y: NODE_HEIGHT + 60 }}
        renderCustomNodeElement={renderRectSvgNode}
      />
    </div>
  );
}

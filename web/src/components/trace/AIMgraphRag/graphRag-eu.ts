export interface PolicyData {
  policy_id: string;
  category: string;
  subcategory: string;
  policy_rule: string;
  severity_level: number;
  response_template: string[];
}

export interface SubParent {
  policy_id: string;
  title: string;
  description: string;
  children_policy_ids: string[];
}

export interface Parent {
  policy_id: string;
  title: string;
  description: string;
  children_policy_ids: string[];
  subparents?: SubParent[];
}

export interface Relationship {
  from: string;
  to: string;
  relationship_type: string;
  edge_description: string;
}

// Parent와 Relationship을 포함하는 전체 구조를 위한 인터페이스
export interface PolicyHierarchy {
  parents: Parent[];
  relationships: Relationship[];
}

interface GraphNode {
  id: string;
  name: string;
  symbolSize: number;
  x?: number;
  y?: number;
  value: number;
  category: number;
}

interface GraphLink {
  source: string;
  target: string;
  lineStyle?: {
    width?: number;
    type?: 'solid' | 'dashed';
  };
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories: { name: string }[];
}

interface NodeConfig {
  x: number;
  y: number;
  angle: number;
  radius: number;
  level: number;
}

interface DynamicConfig {
  baseRadius: number;
  levelSpread: number;
  angleSpread: number;
  gridSize: number;
  gridSpacing: number;
}

// 중요도에 따른 노드 크기 계산
const getSeveritySize = (severity: number, baseSize: number): number => {
  const severityMultiplier = {
    1: 0.8, // 낮은 중요도
    2: 1.0, // 중간 중요도
    3: 1.3, // 높은 중요도
  };
  return (
    baseSize *
    (severityMultiplier[severity as keyof typeof severityMultiplier] || 1)
  );
};

// 동적 설정 계산
const calculateDynamicConfig = (data: any, maxDepth: number): DynamicConfig => {
  const baseRadius = Math.max(800, 200 * Math.log2(maxDepth + 1));

  return {
    baseRadius,
    levelSpread: baseRadius * 0.4,
    angleSpread: Math.PI * 0.4,
    gridSize: 3, // 3x3 grid
    gridSpacing: baseRadius * 0.45, // grid 간격 (3배 증가)
  };
};

// Grid 위치 계산
const calculateGridPosition = (
  baseX: number,
  baseY: number,
  baseAngle: number,
  index: number,
  config: DynamicConfig
): { x: number; y: number } => {
  const { gridSize, gridSpacing } = config;

  // Grid 내 위치 계산
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  // Grid 중심으로부터의 상대 위치
  const relativeX = (col - (gridSize - 1) / 2) * gridSpacing;
  const relativeY = (row - (gridSize - 1) / 2) * gridSpacing;

  // 기본 방향 벡터 계산
  const directionX = Math.cos(baseAngle);
  const directionY = Math.sin(baseAngle);

  // 방향에 따른 grid 회전
  const rotatedX =
    relativeX * Math.cos(baseAngle) - relativeY * Math.sin(baseAngle);
  const rotatedY =
    relativeX * Math.sin(baseAngle) + relativeY * Math.cos(baseAngle);

  return {
    x: baseX + rotatedX,
    y: baseY + rotatedY,
  };
};

const generateGraphData = (
  data: PolicyData[],
  parents: {
    parents: Parent[];
    relationships: Relationship[];
  }
): GraphData => {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const categories: { name: string }[] = [{ name: 'User Input' }];

  // 기본 노드 크기 설정
  const baseSizes = {
    center: 40,
    main: 35,
    sub: 25,
    leaf: 15,
  };

  // 재귀적 노드 생성
  const createNodes = (
    node: any,
    config: NodeConfig,
    parentId: string | null,
    categoryIndex: number,
    isLeaf: boolean = false
  ) => {
    const { x, y, angle, radius, level } = config;
    const dynamicConfig = calculateDynamicConfig(data, level);

    // 노드 크기 계산
    let nodeSize;
    if (level === 0) nodeSize = baseSizes.center;
    else if (level === 1) nodeSize = baseSizes.main;
    else if (isLeaf)
      nodeSize = getSeveritySize(node.severity_level || 2, baseSizes.leaf);
    else nodeSize = baseSizes.sub;

    // 현재 노드 추가
    nodes.push({
      id: node.policy_id,
      name: node.title || node.policy_rule?.slice(0, 20) + '...' || node.name,
      symbolSize: nodeSize,
      x,
      y,
      value: 100 - level * 20,
      category: categoryIndex,
    });

    // 부모 노드와 연결
    if (parentId) {
      // relationship 찾기
      const relationship = parents.relationships.find(
        (rel) => rel.from === parentId && rel.to === node.policy_id
      );

      links.push({
        source: parentId,
        target: node.policy_id,
        lineStyle: {
          width: level === 1 ? 3 : node.severity_level === 3 ? 2 : 1,
          type:
            relationship?.relationship_type === 'requirement'
              ? 'solid'
              : 'dashed',
        },
      });
    }

    // 하위 노드 처리
    const children =
      node.subparents ||
      (node.children_policy_ids &&
        data.filter((p) => node.children_policy_ids.includes(p.policy_id)));

    if (children && children.length > 0) {
      const totalChildren = children.length;
      const childSpread =
        dynamicConfig.angleSpread / Math.max(totalChildren, 1);

      children.forEach((child: any, index: number) => {
        const childAngle =
          angle + childSpread * (index - (totalChildren - 1) / 2);
        const childRadius = radius + dynamicConfig.levelSpread;
        const isChildLeaf = !child.subparents && !child.children_policy_ids;

        if (isChildLeaf) {
          // Grid 기반 위치 계산
          const gridPos = calculateGridPosition(
            x + childRadius * Math.cos(angle),
            y + childRadius * Math.sin(angle),
            angle,
            index,
            dynamicConfig
          );

          createNodes(
            child,
            {
              x: gridPos.x,
              y: gridPos.y,
              angle: childAngle,
              radius: childRadius,
              level: level + 1,
            },
            node.policy_id,
            categoryIndex,
            true
          );
        } else {
          // 비 리프노드는 기존 방식대로 배치
          createNodes(
            child,
            {
              x: x + childRadius * Math.cos(childAngle),
              y: y + childRadius * Math.sin(childAngle),
              angle: childAngle,
              radius: childRadius,
              level: level + 1,
            },
            node.policy_id,
            categoryIndex,
            false
          );
        }
      });
    }
  };

  // 중앙 노드 추가
  const centerNode = {
    policy_id: 'center',
    name: 'User Input',
    title: 'User Input',
  };

  createNodes(
    centerNode,
    {
      x: 0,
      y: 0,
      angle: 0,
      radius: 0,
      level: 0,
    },
    null,
    0
  );

  // 메인 카테고리 및 하위 노드 생성
  const totalMainCategories = parents.parents.length;
  const mainAngleSpread = (Math.PI * 2) / totalMainCategories;

  parents.parents.forEach((parent, index) => {
    categories.push({ name: parent.title });
    const categoryIndex = categories.length - 1;
    const angle = index * mainAngleSpread;
    const config = calculateDynamicConfig(data, 1);

    createNodes(
      parent,
      {
        x: config.baseRadius * Math.cos(angle),
        y: config.baseRadius * Math.sin(angle),
        angle,
        radius: config.baseRadius,
        level: 1,
      },
      'center',
      categoryIndex
    );
  });

  return { nodes, links, categories };
};

export const generateGraph = (
  data: PolicyData[],
  parents: { parents: Parent[]; relationships: Relationship[] }
) => {
  return generateGraphData(data, parents);
};

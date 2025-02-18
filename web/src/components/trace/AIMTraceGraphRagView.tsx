//! AIM Intelligence
import { type Trace } from "@langfuse/shared";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { GraphChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsOption } from "echarts/types/dist/shared";
import { generateGraph } from "@/src/components/trace/AIMgraphRag/graphRag-eu";
// import { data } from "@/src/components/trace/AIMgraphRag/safe-guide-eu";
// import { parents } from "@/src/components/trace/AIMgraphRag/parent-node-eu";
import { useActiveNodesStore } from "@/src/store/activeNodes";
import { deepParseJson } from "@langfuse/shared";
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphChart,
  CanvasRenderer,
]);

interface PolicyData {
  policy_id: string;
  category: string;
  subcategory: string;
  policy_rule: string;
  severity_level: number;
  response_template: string[];
}

interface TooltipFormatter {
  formatter: () => string;
}

interface GraphNode {
  id?: string;
  name: string;
  symbolSize: number;
  x?: number;
  y?: number;
  value?: number;
  category?: number;
  label?: {
    show?: boolean;
  };
  tooltip?: TooltipFormatter;
  itemStyle?: {
    color?: string;
    opacity?: number;
  };
}

interface GraphLink {
  source: string;
  target: string;
  lineStyle?: {
    width?: number;
    type?: any;
    opacity?: number;
  };
  tooltip?: TooltipFormatter;
}

interface GraphCategory {
  name: string;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  categories: GraphCategory[];
}

export function TraceGraphRagView({
  trace,
  traceId,
  policies
}: {
  trace: any;
  traceId: string;
  policies: any;
}) {

  const parentNode = {parents: policies.policies.parents, relationships: policies.policies.relationships}
  const rawLeafNode =  policies.policies.policies

  const leafNode = rawLeafNode.map((node: any) => ({
    ...node,
    severity_level: 1,
    response_template: [""]  // response_template을 배열로 설정
  }));

  // console.log('trace, trace', deepParseJson(trace.output).active_paths.active_node_log)


  // console.log("parentNode", parentNode);
  // console.log("leafNode", leafNode);


  const { setActiveNodeLog } = useActiveNodesStore();


  // trace.output?.active_paths가 없을 때의 기본값 설정
  const defaultActiveNodeLog = {
    // Only set default when there's no existing state
    all_nodes_active: useActiveNodesStore.getState().getActiveNodeLog(traceId).all_nodes_active ?? true,
  };

  // trace.output?.active_paths.active_node_log가 변경될 때마다 store 업데이트
  useEffect(() => {
    let newActiveNodeLog = defaultActiveNodeLog;

    try {
      if (trace.output) {
        const parsedOutput = deepParseJson(trace.output) as { active_paths: { active_node_log: any } };
        if (Object.keys(parsedOutput.active_paths.active_node_log).length > 0) {
          const parsed = parsedOutput.active_paths;

          console.log('parsed', parsed)
          // Merge with existing state instead of replacing
          newActiveNodeLog = {
            ...useActiveNodesStore.getState().getActiveNodeLog(traceId),
            ...parsed.active_node_log
          };
        } else {
          // Merge with existing state instead of replacing
          newActiveNodeLog = {
            ...useActiveNodesStore.getState().getActiveNodeLog(traceId),
            ...trace.output.active_paths.active_node_log
          };
        }
      }
    } catch (error) {
      console.warn("Error parsing active_paths:", error);
      // Keep existing state on error
      newActiveNodeLog = useActiveNodesStore.getState().getActiveNodeLog(traceId);
    }

    setActiveNodeLog(traceId, newActiveNodeLog);
  }, [trace.output?.active_paths, setActiveNodeLog, traceId]);

  // activeNodeLog를 store에서 가져오기
  const activeNodeLog = useActiveNodesStore((state) =>
    state.getActiveNodeLog(traceId),
  );

  const graphData = generateGraph(leafNode as any, parentNode);

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  console.log("activeNodeLog", activeNodeLog);

  const updateNodeStyles = (
    graph: GraphData,
    isInitialRender: boolean = false,
  ) => {
    // Create maps for quick lookups
    const policyMap = new Map(leafNode.map((policy: any) => [policy.policy_id, policy]));

    // Create maps for parent and subparent nodes
    const parentMap = new Map();
    parentNode.parents.forEach((parent: any) => {
      parentMap.set(parent.policy_id, parent);
      parent.subparents?.forEach((subparent: any) => {
        parentMap.set(subparent.policy_id, subparent);
      });
    });

    // Create map for relationships
    const relationshipMap = new Map();
    parentNode.relationships.forEach((rel: any) => {
      relationshipMap.set(`${rel.from}-${rel.to}`, rel);
    });

    // If it's initial render, return graph without style modifications
    if (isInitialRender) {
      graph.nodes.forEach((node: GraphNode) => {
        if (node.id) {
          node.itemStyle = {
            opacity: 1,
          };

          // Update tooltips
          let tooltipContent = "";
          if (policyMap.has(node.id)) {
            const policy = policyMap.get(node.id) as PolicyData;
            tooltipContent = `
              <div class="text-sm">
                <div class="font-bold mb-1">${policy.policy_id}</div>
                <div class="mb-2"><b>Rule:</b> ${policy.policy_rule}</div>
                <div class="mb-1"><b>Severity:</b> Level ${policy.severity_level}</div>
                <div class="text-wrap"><b>Response:</b> ${policy.response_template[0]}</div>
              </div>
            `;
          } else if (parentMap.has(node.id)) {
            const parent = parentMap.get(node.id);
            tooltipContent = `
              <div class="text-sm">
                <div class="font-bold mb-1">${node.id}</div>
                <div class="font-bold mb-1">${parent.title}</div>
                <div class="mb-2 max-w-[500px] text-wrap">${
                  parent.description
                }</div>
                ${
                  parent.children_policy_ids
                    ? `<div class="text-wrap"><b>Child Policies:</b> ${parent.children_policy_ids.join(
                        ", ",
                      )}</div>`
                    : ""
                }
              </div>
            `;
          }

          if (tooltipContent) {
            node.tooltip = {
              formatter: () => tooltipContent,
            };
          }
        }
      });

      graph.links.forEach((link: GraphLink) => {
        link.lineStyle = {
          ...link.lineStyle,
          opacity: 1,
        };

        // Update link tooltips
        const relationshipKey = `${link.source}-${link.target}`;
        if (relationshipMap.has(relationshipKey)) {
          const relationship = relationshipMap.get(relationshipKey);
          link.tooltip = {
            formatter: () => `
              <div class="text-sm">
                <div class="font-bold mb-1">Relationship Type: ${relationship.relationship_type}</div>
                <div>${relationship.edge_description}</div>
              </div>
            `,
          };
        }
      });

      return graph;
    }

    // Get all active node IDs from activeNodeLog
    const activeNodeIds = new Set<string>();

    //! 모든 노드가 활성화 상태인 경우 처리
    if (!activeNodeLog.all_nodes_active) {
      graph.nodes.forEach((node: GraphNode) => {
        if (node.id) {
          activeNodeIds.add(node.id);
        }
      });
    } else {
      // Recursively collect all node IDs from activeNodeLog
      const collectNodeIds = (obj: any) => {
        if (obj.policy_id) {
          activeNodeIds.add(obj.policy_id);
        }
        // Iterate through all properties that might be objects
        Object.values(obj).forEach((value) => {
          if (value && typeof value === "object") {
            collectNodeIds(value);
          }
        });
      };

      // Process activeNodeLog
      Object.values(activeNodeLog).forEach((value) => {
        collectNodeIds(value);
      });
    }

    // Update node styles based on active status
    graph.nodes.forEach((node: GraphNode) => {
      if (node.id) {
        // Always keep center node active
        if (node.id === "center" || activeNodeIds.has(node.id)) {
          // Keep original color and full opacity for active nodes
          node.itemStyle = {
            opacity: 1,
          };
        } else {
          // Set inactive nodes to gray with reduced opacity
          node.itemStyle = {
            color: "#CCCCCC",
            opacity: 0.3,
          };
        }

        // Update tooltips
        let tooltipContent = "";
        if (policyMap.has(node.id)) {
          const policy = policyMap.get(node.id) as PolicyData;
          tooltipContent = `
            <div class="text-sm">
              <div class="font-bold mb-1">${policy.policy_id}</div>
              <div class="mb-2"><b>Rule:</b> ${policy.policy_rule}</div>
              <div class="mb-1"><b>Severity:</b> Level ${policy.severity_level}</div>
              <div class="text-wrap"><b>Response:</b> ${policy.response_template[0]}</div>
            </div>
          `;
        } else if (parentMap.has(node.id)) {
          const parent = parentMap.get(node.id);
          tooltipContent = `
            <div class="text-sm">
              <div class="font-bold mb-1">${node.id}</div>
              <div class="font-bold mb-1">${parent.title}</div>
              <div class="mb-2 max-w-[500px] text-wrap">${
                parent.description
              }</div>
              ${
                parent.children_policy_ids
                  ? `<div class="text-wrap"><b>Child Policies:</b> ${parent.children_policy_ids.join(
                      ", ",
                    )}</div>`
                  : ""
              }
            </div>
          `;
        }

        if (tooltipContent) {
          node.tooltip = {
            formatter: () => tooltipContent,
          };
        }
      }
    });

    // Update link styles
    graph.links.forEach((link: GraphLink) => {
      const sourceActive =
        link.source === "center" || activeNodeIds.has(link.source);
      const targetActive =
        link.target === "center" || activeNodeIds.has(link.target);

      link.lineStyle = {
        ...link.lineStyle,
        opacity: sourceActive && targetActive ? 1 : 0.1,
      };

      // Update link tooltips
      const relationshipKey = `${link.source}-${link.target}`;
      if (relationshipMap.has(relationshipKey)) {
        const relationship = relationshipMap.get(relationshipKey);
        link.tooltip = {
          formatter: () => `
            <div class="text-sm">
              <div class="font-bold mb-1">Relationship Type: ${relationship.relationship_type}</div>
              <div>${relationship.edge_description}</div>
            </div>
          `,
        };
      }
    });

    return graph;
  };

  useEffect(() => {
    console.log("Active Node Log updated:", activeNodeLog);

    if (chartInstance.current) {
      const currentOption = chartInstance.current.getOption();

      // series가 존재하는지 확인
      if (
        currentOption &&
        currentOption.series &&
        Array.isArray(currentOption.series)
      ) {
        console.log("currentOption", currentOption);
        const updatedGraph = updateNodeStyles(
          JSON.parse(JSON.stringify(graphData)),
        );

        // Type assertion for the series option
        const seriesOption = currentOption.series[0];
        if (seriesOption) {
          seriesOption.data = updatedGraph.nodes;
          seriesOption.links = updatedGraph.links;

          // setOption 호출 시 옵션 병합 설정 추가
          chartInstance.current.setOption(currentOption, {
            notMerge: false,
            lazyUpdate: true,
          });
        }
      }
    }
  }, [activeNodeLog]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const graph: GraphData = updateNodeStyles(
          JSON.parse(JSON.stringify(graphData)),
          true,
        );

        // Create maps for quick lookups
        const policyMap = new Map(
          leafNode.map((policy: any) => [policy.policy_id, policy]),
        );

        // Create maps for parent and subparent nodes
        const parentMap = new Map();
        parentNode.parents.forEach((parent: any) => {
          parentMap.set(parent.policy_id, parent);
          parent.subparents?.forEach((subparent: any) => {
            parentMap.set(subparent.policy_id, subparent);
          });
        });

        // Create map for relationships
        const relationshipMap = new Map();
          parentNode.relationships.forEach((rel: any) => {
          relationshipMap.set(`${rel.from}-${rel.to}`, rel);
        });

        // Update node labels and tooltips
        graph.nodes.forEach((node: GraphNode) => {
          node.label = {
            show: node.symbolSize > 10,
          };

          if (node.id) {
            let tooltipContent = "";

            // Check if it's a policy node
            if (policyMap.has(node.id)) {
              const policy = policyMap.get(node.id) as PolicyData;
              tooltipContent = `
                <div class="text-sm">
                  <div class="font-bold mb-1">${policy.policy_id}</div>
                  <div class="mb-2"><b>Rule:</b> ${policy.policy_rule}</div>
                  <div class="mb-1"><b>Severity:</b> Level ${policy.severity_level}</div>
                  <div class="text-wrap"><b>Response:</b> ${policy.response_template[0]}</div>
                </div>
              `;
            }
            // Check if it's a parent/category node
            else if (parentMap.has(node.id)) {
              const parent = parentMap.get(node.id);
              tooltipContent = `
                <div class="text-sm">
                  <div class="font-bold mb-1">${node.id}</div>
                  <div class="font-bold mb-1">${parent.title}</div>
                  <div class="mb-2 max-w-[500px] text-wrap">${
                    parent.description
                  }</div>
                  ${
                    parent.children_policy_ids
                      ? `<div class="text-wrap"><b>Child Policies:</b> ${parent.children_policy_ids.join(
                          ", ",
                        )}</div>`
                      : ""
                  }
                </div>
              `;
            }

            if (tooltipContent) {
              node.tooltip = {
                formatter: () => tooltipContent,
              };
            }
          }
        });

        // Update link tooltips with relationship data
        graph.links.forEach((link: GraphLink) => {
          const relationshipKey = `${link.source}-${link.target}`;
          if (relationshipMap.has(relationshipKey)) {
            const relationship = relationshipMap.get(relationshipKey);
            link.tooltip = {
              formatter: () => `
                <div class="text-sm">
                  <div class="font-bold mb-1">Relationship Type: ${relationship.relationship_type}</div>
                  <div>${relationship.edge_description}</div>
                </div>
              `,
            };
          }
        });

        if (chartRef.current) {
          chartInstance.current = echarts.init(chartRef.current);

          const option: EChartsOption = {
            title: {
              text: "Safe Guideline Graph",
              subtext: "Safe Guideline Graph RAG",
              top: "bottom",
              left: "right",
            },
            tooltip: {
              formatter: (params: any) => {
                if (params.data.tooltip) {
                  return params.data.tooltip.formatter();
                }
                return params.data.name;
              },
              position: "top",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderColor: "#ccc",
              borderWidth: 1,
              padding: [10, 15],
              textStyle: {
                color: "#333",
              },
            },
            legend: [
              {
                data: graph.categories.map((a) => a.name),
              },
            ],
            animationDuration: 1000,
            animationEasingUpdate: "quinticInOut",
            series: [
              {
                name: graph.nodes[0].name,
                type: "graph",
                layout: "none",
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                legendHoverLink: false,
                roam: true,
                label: {
                  show: true,
                  position: "inside",
                  formatter: "{b}",
                },
                lineStyle: {
                  color: "source",
                  curveness: 0.3,
                },
                emphasis: {
                  focus: "adjacency",
                  lineStyle: {
                    width: 10,
                  },
                },
              },
            ],
          };

          chartInstance.current.setOption(option);
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchData();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <div
        ref={chartRef}
        style={{ width: "100%", height: "100%" }}
        className="mx-auto rounded-lg border border-gray-200 bg-white p-4"
      />
    </div>
  );
}

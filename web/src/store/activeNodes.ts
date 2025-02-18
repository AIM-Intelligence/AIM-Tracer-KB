//! AIM Intelligence
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveNodeLog {
  all_nodes_active: boolean;
  [key: string]: any;
}

interface ActiveNodesState {
  activeNodeLogs: Record<string, ActiveNodeLog>;
  setActiveNodeLog: (traceId: string, log: ActiveNodeLog) => void;
  getActiveNodeLog: (traceId: string) => ActiveNodeLog;
  clearActiveNodeLog: (traceId: string) => void;
}

export const useActiveNodesStore = create<ActiveNodesState>()(
  persist(
    (set, get) => ({
      activeNodeLogs: {},
      setActiveNodeLog: (traceId: string, log: ActiveNodeLog) =>
        set((state) => ({
          activeNodeLogs: {
            ...state.activeNodeLogs,
            [traceId]: log,
          },
        })),
      getActiveNodeLog: (traceId: string) => {
        const state = get();
        return state.activeNodeLogs[traceId] || { all_nodes_active: false };
      },
      clearActiveNodeLog: (traceId: string) =>
        set((state) => ({
          activeNodeLogs: {
            ...state.activeNodeLogs,
            [traceId]: { all_nodes_active: false },
          },
        })),
    }),
    {
      name: 'active-nodes-storage',
      partialize: (state) => ({ activeNodeLogs: state.activeNodeLogs }),
    }
  )
);

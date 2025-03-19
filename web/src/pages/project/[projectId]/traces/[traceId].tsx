import { useRouter } from "next/router";
import { TracePage } from "@/src/components/trace";
import { useCallback, useState, useEffect } from 'react';

export default function Trace() {
  const router = useRouter();
  const traceId = router.query.traceId as string;

  const timestamp =
    router.query.timestamp && typeof router.query.timestamp === "string"
      ? new Date(decodeURIComponent(router.query.timestamp))
      : undefined;

  // ! AIM Intelligence
  const [policies, setPolicies] = useState<any | null>(null);

  const fetchPolicies = useCallback(async () => {
    try {
      const response = await fetch('/api/aim/get-policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_id: router.query.projectId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch policies: ${errorText}`);
      }

      const data = await response.json();
      setPolicies(data);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  }, [router.query.projectId]);

  useEffect(() => {
    if (router.query.projectId) {
      fetchPolicies();
    }
  }, [router.query.projectId, fetchPolicies]);

  return <TracePage traceId={traceId} timestamp={timestamp} policies={policies} />;
}

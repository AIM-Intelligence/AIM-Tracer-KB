//! AIM Intelligence
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getAuthOptions } from "@/src/server/auth";
import { isProjectMemberOrAdmin } from '@/src/server/utils/checkProjectMembershipOrAdmin';
import { ApiError, ForbiddenError, UnauthorizedError } from "@langfuse/shared";

export async function POST(request: NextRequest) {
  try {
    // Extract and validate project_id first
    let project_id: string;
    try {
      const body = await request.json();
      project_id = body.project_id;
      
      if (!project_id) {
        return NextResponse.json(
          { error: "project_id is required" },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Authentication check
    const authOptions = await getAuthOptions();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new UnauthorizedError("Unauthenticated");
    }

    // Authorization check
    if (!isProjectMemberOrAdmin(session.user, project_id)) {
      throw new ForbiddenError("User is not a member of this project");
    }

    console.log("Project ID:", project_id);

    // Proceed with API call only after all checks pass
    const formData = new URLSearchParams();
    formData.append('project_id', project_id);

    // Call external API
    const response = await fetch(
      "http://211.115.110.155:8701/get-project-policies",
      {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString() // URLSearchParams 객체를 문자열로 변환
      }
    );

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new ApiError(
        "Get policies failed from AIM Server",
      );
    }

    const data = await response.json();

    console.log("Response data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in get-policies:", error);
    if (error instanceof Error) {
      throw new ApiError(
        "Get policies failed",
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

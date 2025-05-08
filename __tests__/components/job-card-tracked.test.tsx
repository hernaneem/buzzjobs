"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { JobCardTracked } from "@/components/job-card-tracked"
import { mockBehaviorTrackingContext } from "../mocks/supabase"

// Mock del componente JobCard
jest.mock("@/components/ui/job-card", () => ({
  JobCard: ({ id, title, company, onSave, isSaved, ...props }: any) => (
    <div data-testid="job-card">
      <h3>{title}</h3>
      <p>{company}</p>
      <button onClick={onSave} data-testid="save-button">
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  ),
}))

// Mock del hook de seguimiento
jest.mock("@/hooks/use-behavior-tracking", () => ({
  useBehaviorTracking: () => mockBehaviorTrackingContext,
}))

describe("JobCardTracked Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders JobCard with correct props", () => {
    render(
      <JobCardTracked
        id="job-123"
        title="Frontend Developer"
        company="Acme Inc."
        location="Remote"
        tags={["React", "TypeScript"]}
        isNew={true}
        isRemote={true}
      />,
    )

    expect(screen.getByTestId("job-card")).toBeInTheDocument()
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
    expect(screen.getByText("Acme Inc.")).toBeInTheDocument()
  })

  test("tracks item view on mount", () => {
    render(
      <JobCardTracked
        id="job-123"
        title="Frontend Developer"
        company="Acme Inc."
        location="Remote"
        tags={["React", "TypeScript"]}
        isNew={true}
        isRemote={true}
      />,
    )

    expect(mockBehaviorTrackingContext.trackItemView).toHaveBeenCalledWith("job", "job-123", {
      title: "Frontend Developer",
      company: "Acme Inc.",
      tags: ["React", "TypeScript"],
      isNew: true,
      isUrgent: undefined,
      isRemote: true,
    })
  })

  test("tracks save action and calls original onSave", () => {
    const handleSave = jest.fn()

    render(
      <JobCardTracked
        id="job-123"
        title="Frontend Developer"
        company="Acme Inc."
        location="Remote"
        isSaved={false}
        onSave={handleSave}
      />,
    )

    fireEvent.click(screen.getByTestId("save-button"))

    expect(mockBehaviorTrackingContext.trackUserAction).toHaveBeenCalledWith("save", "job", "job-123", {
      title: "Frontend Developer",
      company: "Acme Inc.",
      action: "save",
    })
    expect(handleSave).toHaveBeenCalledTimes(1)
  })

  test("tracks unsave action when job is already saved", () => {
    const handleSave = jest.fn()

    render(
      <JobCardTracked
        id="job-123"
        title="Frontend Developer"
        company="Acme Inc."
        location="Remote"
        isSaved={true}
        onSave={handleSave}
      />,
    )

    fireEvent.click(screen.getByTestId("save-button"))

    expect(mockBehaviorTrackingContext.trackUserAction).toHaveBeenCalledWith("save", "job", "job-123", {
      title: "Frontend Developer",
      company: "Acme Inc.",
      action: "unsave",
    })
  })
})

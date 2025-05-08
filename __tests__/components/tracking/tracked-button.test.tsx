"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { TrackedButton } from "@/components/tracking/tracked-button"
import { mockBehaviorTrackingContext } from "../../mocks/supabase"

// Mock del contexto de seguimiento
jest.mock("@/hooks/use-behavior-tracking", () => ({
  useBehaviorTracking: () => mockBehaviorTrackingContext,
}))

describe("TrackedButton Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders correctly with required props", () => {
    render(
      <TrackedButton trackingId="test-button" category="ui">
        Click Me
      </TrackedButton>,
    )

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  test("tracks click events with default action type", () => {
    render(
      <TrackedButton trackingId="test-button" category="ui">
        Track Click
      </TrackedButton>,
    )

    const button = screen.getByRole("button", { name: /track click/i })
    fireEvent.click(button)

    expect(mockBehaviorTrackingContext.trackUserAction).toHaveBeenCalledWith("click", "ui", "test-button", undefined)
  })

  test("tracks click events with custom action type", () => {
    render(
      <TrackedButton
        trackingId="apply-button"
        category="job"
        actionType="apply"
        metadata={{ jobId: "123", jobTitle: "Developer" }}
      >
        Apply Now
      </TrackedButton>,
    )

    const button = screen.getByRole("button", { name: /apply now/i })
    fireEvent.click(button)

    expect(mockBehaviorTrackingContext.trackUserAction).toHaveBeenCalledWith("apply", "job", "apply-button", {
      jobId: "123",
      jobTitle: "Developer",
    })
  })

  test("calls original onClick handler if provided", () => {
    const handleClick = jest.fn()

    render(
      <TrackedButton trackingId="test-button" category="ui" onClick={handleClick}>
        Dual Action
      </TrackedButton>,
    )

    const button = screen.getByRole("button", { name: /dual action/i })
    fireEvent.click(button)

    expect(mockBehaviorTrackingContext.trackUserAction).toHaveBeenCalled()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("passes through button props correctly", () => {
    render(
      <TrackedButton
        trackingId="test-button"
        category="ui"
        variant="secondary"
        size="sm"
        disabled
        className="custom-class"
      >
        Custom Button
      </TrackedButton>,
    )

    const button = screen.getByRole("button", { name: /custom button/i })
    expect(button).toHaveClass("custom-class")
    expect(button).toBeDisabled()
  })
})

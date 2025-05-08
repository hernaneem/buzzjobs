import { render, screen, fireEvent } from "@testing-library/react"
import { TrackedLink } from "@/components/tracking/tracked-link"
import { mockBehaviorTrackingContext } from "../../mocks/supabase"

// Mock del contexto de seguimiento
jest.mock("@/hooks/use-behavior-tracking", () => ({
  useBehaviorTracking: () => mockBehaviorTrackingContext,
}))

describe("TrackedLink Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders correctly with required props", () => {
    render(
      <TrackedLink href="/test" category="navigation">
        Test Link
      </TrackedLink>,
    )

    const link = screen.getByRole("link", { name: /test link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  test("tracks click events with href as default trackingId", () => {
    render(
      <TrackedLink href="/jobs" category="navigation">
        Jobs
      </TrackedLink>,
    )

    const link = screen.getByRole("link", { name: /jobs/i })
    fireEvent.click(link)

    expect(mockBehaviorTrackingContext.trackEvent).toHaveBeenCalledWith("link_click", "navigation", {
      elementId: "/jobs",
      metadata: undefined,
    })
  })

  test("tracks click events with custom trackingId and metadata", () => {
    render(
      <TrackedLink
        href="/companies/123"
        trackingId="company-profile"
        category="company"
        metadata={{ companyId: "123", companyName: "Acme Inc." }}
      >
        View Company
      </TrackedLink>,
    )

    const link = screen.getByRole("link", { name: /view company/i })
    fireEvent.click(link)

    expect(mockBehaviorTrackingContext.trackEvent).toHaveBeenCalledWith("link_click", "company", {
      elementId: "company-profile",
      metadata: { companyId: "123", companyName: "Acme Inc." },
    })
  })

  test("applies custom className", () => {
    render(
      <TrackedLink href="/test" category="navigation" className="custom-link-class">
        Styled Link
      </TrackedLink>,
    )

    const link = screen.getByRole("link", { name: /styled link/i })
    expect(link).toHaveClass("custom-link-class")
  })

  test("passes through Next.js Link props correctly", () => {
    render(
      <TrackedLink href="/test" category="navigation" prefetch={false} replace scroll={false}>
        Advanced Link
      </TrackedLink>,
    )

    const link = screen.getByRole("link", { name: /advanced link/i })
    expect(link).toBeInTheDocument()
    // No podemos verificar las props internas de Next.js Link directamente,
    // pero al menos verificamos que el componente se renderiza correctamente
  })
})

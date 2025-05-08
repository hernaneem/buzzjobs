import { render, screen } from "@testing-library/react"
import { PageHeader } from "@/components/page-header"

describe("PageHeader Component", () => {
  test("renders title correctly", () => {
    render(<PageHeader title="Test Title" />)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Title")).toHaveClass("text-3xl")
    expect(screen.getByText("Test Title")).toHaveClass("font-bold")
  })

  test("renders description when provided", () => {
    render(<PageHeader title="Test Title" description="This is a test description" />)

    expect(screen.getByText("This is a test description")).toBeInTheDocument()
    expect(screen.getByText("This is a test description")).toHaveClass("text-muted-foreground")
  })

  test("renders children when provided", () => {
    render(
      <PageHeader title="Test Title">
        <button>Test Button</button>
      </PageHeader>,
    )

    expect(screen.getByRole("button", { name: "Test Button" })).toBeInTheDocument()
  })

  test("applies custom className", () => {
    render(<PageHeader title="Test Title" className="custom-class" />)

    const header = screen.getByText("Test Title").closest("div")
    expect(header).toHaveClass("custom-class")
  })

  test("renders with all props and children", () => {
    render(
      <PageHeader title="Complete Test" description="Complete test description" className="test-class">
        <div data-testid="test-child">Child Content</div>
      </PageHeader>,
    )

    expect(screen.getByText("Complete Test")).toBeInTheDocument()
    expect(screen.getByText("Complete test description")).toBeInTheDocument()
    expect(screen.getByTestId("test-child")).toBeInTheDocument()
    expect(screen.getByText("Complete Test").closest("div")).toHaveClass("test-class")
  })
})

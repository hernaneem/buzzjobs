import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/ui/badge-custom"

describe("Badge Component", () => {
  test("renders correctly with default props", () => {
    render(<Badge>Default Badge</Badge>)
    const badge = screen.getByText("Default Badge")

    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass("bg-honey")
    expect(badge).toHaveClass("text-jet")
    expect(badge).toHaveClass("border-transparent")
  })

  test("applies variant classes correctly", () => {
    const variants = ["default", "secondary", "destructive", "outline", "new", "urgent", "remote"]

    variants.forEach((variant) => {
      const { rerender } = render(<Badge variant={variant as any}>{variant} Badge</Badge>)
      const badge = screen.getByText(`${variant} Badge`)

      // Verificar clases específicas según la variante
      if (variant === "default" || variant === "new") {
        expect(badge).toHaveClass("bg-honey")
        expect(badge).toHaveClass("text-jet")
      } else if (variant === "secondary" || variant === "remote") {
        expect(badge).toHaveClass("bg-nectar")
        expect(badge).toHaveClass("text-jet")
      } else if (variant === "destructive" || variant === "urgent") {
        expect(badge).toHaveClass("bg-destructive")
      } else if (variant === "outline") {
        expect(badge).toHaveClass("text-foreground")
      }

      rerender(<></>)
    })
  })

  test("applies custom className", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>)

    const badge = screen.getByText("Custom Badge")
    expect(badge).toHaveClass("custom-class")
  })

  test("renders with additional props", () => {
    render(<Badge data-testid="test-badge">Test Badge</Badge>)

    const badge = screen.getByTestId("test-badge")
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent("Test Badge")
  })

  test("combines variant and custom classes correctly", () => {
    render(
      <Badge variant="secondary" className="custom-class">
        Combined Classes Badge
      </Badge>,
    )

    const badge = screen.getByText("Combined Classes Badge")
    expect(badge).toHaveClass("bg-nectar")
    expect(badge).toHaveClass("text-jet")
    expect(badge).toHaveClass("custom-class")
  })
})

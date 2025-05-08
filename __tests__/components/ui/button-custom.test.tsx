"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "@/components/ui/button-custom"

describe("Button Component", () => {
  test("renders correctly with default props", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: /click me/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("bg-honey")
    expect(button).toHaveClass("text-jet")
  })

  test("applies variant classes correctly", () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByRole("button", { name: /secondary button/i })

    expect(button).toHaveClass("border-2")
    expect(button).toHaveClass("border-jet")
    expect(button).toHaveClass("text-jet")
  })

  test("applies size classes correctly", () => {
    render(<Button size="sm">Small Button</Button>)
    const button = screen.getByRole("button", { name: /small button/i })

    expect(button).toHaveClass("h-9")
    expect(button).toHaveClass("rounded-md")
    expect(button).toHaveClass("px-3")
  })

  test("handles click events", () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clickable</Button>)

    const button = screen.getByRole("button", { name: /clickable/i })
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test("does not trigger onClick when disabled", () => {
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>,
    )

    const button = screen.getByRole("button", { name: /disabled button/i })
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:opacity-50")
  })

  test("renders as a child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>,
    )

    const link = screen.getByRole("link", { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveClass("bg-honey")
  })

  test("applies custom className", () => {
    render(<Button className="custom-class">Custom Button</Button>)

    const button = screen.getByRole("button", { name: /custom button/i })
    expect(button).toHaveClass("custom-class")
  })
})

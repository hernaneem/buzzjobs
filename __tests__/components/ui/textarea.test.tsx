import React from "react"
import { render, screen } from "@testing-library/react"
import { Textarea } from "@/components/ui/textarea"

describe("Textarea Component", () => {
  test("renders correctly with default props", () => {
    render(<Textarea />)
    const textarea = screen.getByRole("textbox")

    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveClass("flex")
    expect(textarea).toHaveClass("min-h-[80px]")
    expect(textarea).toHaveClass("w-full")
    expect(textarea).toHaveClass("rounded-md")
  })

  test("applies custom className", () => {
    render(<Textarea className="custom-class" />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveClass("custom-class")
  })

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe("TEXTAREA")
  })

  test("applies disabled state correctly", () => {
    render(<Textarea disabled />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass("disabled:cursor-not-allowed")
    expect(textarea).toHaveClass("disabled:opacity-50")
  })

  test("applies placeholder correctly", () => {
    const placeholder = "Enter your message"
    render(<Textarea placeholder={placeholder} />)

    const textarea = screen.getByPlaceholderText(placeholder)
    expect(textarea).toBeInTheDocument()
  })

  test("applies additional HTML attributes", () => {
    render(<Textarea name="message" rows={5} maxLength={200} required />)

    const textarea = screen.getByRole("textbox")
    expect(textarea).toHaveAttribute("name", "message")
    expect(textarea).toHaveAttribute("rows", "5")
    expect(textarea).toHaveAttribute("maxLength", "200")
    expect(textarea).toHaveAttribute("required")
  })
})

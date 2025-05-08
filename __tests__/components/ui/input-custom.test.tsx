"use client"

import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Input } from "@/components/ui/input-custom"

describe("Input Component", () => {
  test("renders correctly with default props", () => {
    render(<Input />)
    const input = screen.getByRole("textbox")

    expect(input).toBeInTheDocument()
    expect(input).toHaveClass("flex")
    expect(input).toHaveClass("h-10")
    expect(input).toHaveClass("w-full")
    expect(input).toHaveClass("rounded-[2px]")
  })

  test("applies custom className", () => {
    render(<Input className="custom-class" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("custom-class")
  })

  test("handles value changes", () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "test value" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test("forwards ref correctly", () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe("INPUT")
  })

  test("applies disabled state correctly", () => {
    render(<Input disabled />)

    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
    expect(input).toHaveClass("disabled:cursor-not-allowed")
    expect(input).toHaveClass("disabled:opacity-50")
  })

  test("applies placeholder correctly", () => {
    const placeholder = "Enter your name"
    render(<Input placeholder={placeholder} />)

    const input = screen.getByPlaceholderText(placeholder)
    expect(input).toBeInTheDocument()
  })

  test("applies type attribute correctly", () => {
    render(<Input type="password" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type", "password")
  })

  test("applies additional HTML attributes", () => {
    render(<Input name="username" maxLength={10} required />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("name", "username")
    expect(input).toHaveAttribute("maxLength", "10")
    expect(input).toHaveAttribute("required")
  })
})

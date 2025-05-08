import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card-custom"

describe("Card Components", () => {
  test("Card renders correctly with default props", () => {
    render(<Card>Card Content</Card>)

    const card = screen.getByText("Card Content")
    expect(card).toBeInTheDocument()
    expect(card.parentElement).toHaveClass("rounded-lg")
    expect(card.parentElement).toHaveClass("border")
    expect(card.parentElement).toHaveClass("bg-card")
  })

  test("Card applies custom className", () => {
    render(<Card className="custom-class">Card Content</Card>)

    const card = screen.getByText("Card Content")
    expect(card.parentElement).toHaveClass("custom-class")
  })

  test("CardHeader renders correctly", () => {
    render(<CardHeader>Header Content</CardHeader>)

    const header = screen.getByText("Header Content")
    expect(header).toBeInTheDocument()
    expect(header.parentElement).toHaveClass("flex")
    expect(header.parentElement).toHaveClass("flex-col")
    expect(header.parentElement).toHaveClass("space-y-1.5")
    expect(header.parentElement).toHaveClass("p-6")
  })

  test("CardTitle renders correctly", () => {
    render(<CardTitle>Card Title</CardTitle>)

    const title = screen.getByText("Card Title")
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass("text-2xl")
    expect(title).toHaveClass("font-semibold")
    expect(title).toHaveClass("leading-none")
    expect(title).toHaveClass("tracking-tight")
  })

  test("CardDescription renders correctly", () => {
    render(<CardDescription>Card Description</CardDescription>)

    const description = screen.getByText("Card Description")
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass("text-sm")
    expect(description).toHaveClass("text-muted-foreground")
  })

  test("CardContent renders correctly", () => {
    render(<CardContent>Content</CardContent>)

    const content = screen.getByText("Content")
    expect(content).toBeInTheDocument()
    expect(content.parentElement).toHaveClass("p-6")
    expect(content.parentElement).toHaveClass("pt-0")
  })

  test("CardFooter renders correctly", () => {
    render(<CardFooter>Footer Content</CardFooter>)

    const footer = screen.getByText("Footer Content")
    expect(footer).toBeInTheDocument()
    expect(footer.parentElement).toHaveClass("flex")
    expect(footer.parentElement).toHaveClass("items-center")
    expect(footer.parentElement).toHaveClass("p-6")
    expect(footer.parentElement).toHaveClass("pt-0")
  })

  test("Card components work together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Example Card</CardTitle>
          <CardDescription>This is a description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <p>Footer content</p>
        </CardFooter>
      </Card>,
    )

    expect(screen.getByText("Example Card")).toBeInTheDocument()
    expect(screen.getByText("This is a description")).toBeInTheDocument()
    expect(screen.getByText("Main content goes here")).toBeInTheDocument()
    expect(screen.getByText("Footer content")).toBeInTheDocument()
  })
})

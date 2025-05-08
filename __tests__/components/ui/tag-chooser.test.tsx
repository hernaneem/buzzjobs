"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { TagChooser } from "@/components/ui/tag-chooser"

describe("TagChooser Component", () => {
  const mockTags = ["React", "Next.js", "TypeScript", "JavaScript", "CSS", "HTML"]
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders correctly with default props", () => {
    render(<TagChooser tags={mockTags} selectedTags={[]} onChange={mockOnChange} />)

    // Verificar que se muestran todas las etiquetas disponibles
    mockTags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument()
    })
  })

  test("renders with pre-selected tags", () => {
    const selectedTags = ["React", "TypeScript"]
    render(<TagChooser tags={mockTags} selectedTags={selectedTags} onChange={mockOnChange} />)

    // Verificar que las etiquetas seleccionadas tienen la clase correcta
    const reactTag = screen.getByText("React").closest("button")
    const typescriptTag = screen.getByText("TypeScript").closest("button")

    expect(reactTag).toHaveClass("bg-honey")
    expect(typescriptTag).toHaveClass("bg-honey")
  })

  test("toggles tag selection on click", () => {
    render(<TagChooser tags={mockTags} selectedTags={[]} onChange={mockOnChange} />)

    // Seleccionar una etiqueta
    fireEvent.click(screen.getByText("React"))

    // Verificar que se llamó a onChange con la etiqueta seleccionada
    expect(mockOnChange).toHaveBeenCalledWith(["React"])

    // Simular que ahora "React" está seleccionado
    mockOnChange.mockClear()
    render(<TagChooser tags={mockTags} selectedTags={["React"]} onChange={mockOnChange} />)

    // Deseleccionar la etiqueta
    fireEvent.click(screen.getByText("React"))

    // Verificar que se llamó a onChange sin la etiqueta
    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  test("handles multiple tag selection", () => {
    render(<TagChooser tags={mockTags} selectedTags={["React"]} onChange={mockOnChange} />)

    // Seleccionar otra etiqueta
    fireEvent.click(screen.getByText("TypeScript"))

    // Verificar que se llamó a onChange con ambas etiquetas
    expect(mockOnChange).toHaveBeenCalledWith(["React", "TypeScript"])
  })

  test("respects maxTags limit", () => {
    const maxTags = 2
    render(
      <TagChooser tags={mockTags} selectedTags={["React", "TypeScript"]} onChange={mockOnChange} maxTags={maxTags} />,
    )

    // Intentar seleccionar una tercera etiqueta
    fireEvent.click(screen.getByText("JavaScript"))

    // Verificar que no se llamó a onChange porque ya se alcanzó el límite
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  test("applies custom className", () => {
    render(<TagChooser tags={mockTags} selectedTags={[]} onChange={mockOnChange} className="custom-class" />)

    const container = screen.getByRole("group")
    expect(container).toHaveClass("custom-class")
  })

  test("renders with custom label", () => {
    const label = "Select your skills"
    render(<TagChooser tags={mockTags} selectedTags={[]} onChange={mockOnChange} label={label} />)

    expect(screen.getByText(label)).toBeInTheDocument()
  })
})

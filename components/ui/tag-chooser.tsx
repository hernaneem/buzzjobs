"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge-custom"
import { Input } from "@/components/ui/input-custom"

interface TagChooserProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
  suggestions?: string[]
}

export function TagChooser({
  tags,
  onChange,
  placeholder = "Añadir etiqueta...",
  className,
  suggestions = [],
}: TagChooserProps) {
  const [input, setInput] = React.useState("")
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    if (e.target.value.length > 0) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault()
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()])
      }
      setInput("")
      setShowSuggestions(false)
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove))
  }

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onChange([...tags, tag])
    }
    setInput("")
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const filteredSuggestions = suggestions.filter(
    (suggestion) => !tags.includes(suggestion) && suggestion.toLowerCase().includes(input.toLowerCase()),
  )

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-[2px] bg-background min-h-10">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <X className="h-3 w-3 cursor-pointer hover:text-foreground/80" onClick={() => removeTag(tag)} />
          </Badge>
        ))}
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => input && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-grow min-w-[120px] border-0 p-0 h-8 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-md max-h-[200px] overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="px-3 py-2 cursor-pointer hover:bg-accent"
              onMouseDown={() => addTag(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button-custom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ConfigurationProfileType } from "@/contexts/tooltip-preferences-context"

interface ProfileSelectorProps {
  profiles: ConfigurationProfileType[]
  activeProfileId: string
  onSelectProfile: (id: string) => void
}

export function ProfileSelector({ profiles, activeProfileId, onSelectProfile }: ProfileSelectorProps) {
  const [open, setOpen] = useState(false)

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[240px] justify-between">
          <span className="truncate">{activeProfile.name}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]">
        <DropdownMenuLabel>Perfiles de configuración</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profiles.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              className="flex items-center justify-between"
              onSelect={() => {
                onSelectProfile(profile.id)
                setOpen(false)
              }}
            >
              <div className="flex flex-col">
                <span>{profile.name}</span>
                <span className="text-xs text-muted-foreground">{profile.description}</span>
              </div>
              {profile.id === activeProfileId && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

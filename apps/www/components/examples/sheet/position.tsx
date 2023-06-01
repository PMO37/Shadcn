"use client"

import { useState } from "react"
import { Button } from "@/registry/default/ui/button"
import { Input } from "@/registry/default/ui/input"
import { Label } from "@/registry/default/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet"

const SHEET_POSITIONS = ["top", "right", "bottom", "left"] as const

type SheetPosition = (typeof SHEET_POSITIONS)[number]

export function SheetPosition() {
  const [position, setPosition] = useState<SheetPosition>("right")
  return (
    <div className="flex flex-col space-y-8">
      <RadioGroup
        defaultValue={position}
        onValueChange={(value) => setPosition(value as SheetPosition)}
      >
        <div className="grid grid-cols-2 gap-2">
          {SHEET_POSITIONS.map((position, index) => (
            <div
              key={`${position}-${index}`}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={position} id={position} />
              <Label htmlFor={position}>{position}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open {position} sheet</Button>
        </SheetTrigger>
        <SheetContent position={position} size="content">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

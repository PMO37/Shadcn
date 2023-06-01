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

const SHEET_SIZES = ["sm", "default", "lg", "xl", "full", "content"] as const

type SheetSize = (typeof SHEET_SIZES)[number]

export default function SheetSize() {
  const [size, setSize] = useState<SheetSize>("default")
  return (
    <div className="flex flex-col space-y-8">
      <RadioGroup
        defaultValue={size}
        onValueChange={(value) => setSize(value as SheetSize)}
      >
        <div className="grid grid-cols-2 gap-2">
          {SHEET_SIZES.map((size, index) => (
            <div
              key={`${size}-${index}`}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={size} id={size} />
              <Label htmlFor={size}>{size}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open {size} sheet</Button>
        </SheetTrigger>
        <SheetContent position="right" size={size}>
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

import { cn } from "@/lib/utils"
import { Slider } from "@/registry/default/ui/slider"

type SliderHorizontalProps = React.ComponentProps<typeof Slider>

export default function SliderHorizontalDemo({
  className,
  ...props
}: SliderHorizontalProps) {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={cn("w-[60%]", className)}
      {...props}
    />
  )
}

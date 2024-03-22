import { Building, Star, User } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import {
  Step,
  StepItem,
  Stepper,
  useStepper,
} from "@/registry/default/ui/stepper"

const steps = [
  { label: "Step 1", icon: User },
  { label: "Step 2", icon: Building },
  { label: "Step 3", icon: Star },
] satisfies StepItem[]

export default function StepperDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map(({ label, icon }, index) => {
          return (
            <Step key={label} label={label} icon={icon}>
              <div className="h-40 flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
                <h1 className="text-xl">Step {index + 1}</h1>
              </div>
            </Step>
          )
        })}
        <Footer />
      </Stepper>
    </div>
  )
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    reset,
    activeStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptional,
  } = useStepper()
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptional ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  )
}

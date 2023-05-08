import { Calendar, Twitter, User } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import { Step, StepConfig, Steps } from "@/registry/new-york/ui/stepper"
import { useStepper } from "@/registry/new-york/ui/use-stepper"

const steps = [
  { label: "Step 1", icon: <Calendar /> },
  { label: "Step 2", icon: <User /> },
  { label: "Step 3", icon: <Twitter /> },
] satisfies StepConfig[]

export default function StepperCustomIcons() {
  const {
    nextStep,
    prevStep,
    resetSteps,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: 0,
    steps,
  })

  return (
    <div className="flex w-full flex-col gap-4">
      <Steps activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step index={index} key={index} {...step}>
            <div className="h-40 w-full rounded-lg bg-slate-100 p-4 text-slate-900 dark:bg-slate-300">
              <p>Step {index + 1} content</p>
            </div>
          </Step>
        ))}
      </Steps>
      <div className="flex items-center justify-end gap-2">
        {activeStep === steps.length ? (
          <>
            <h2>All steps completed!</h2>
            <Button onClick={resetSteps}>Reset</Button>
          </>
        ) : (
          <>
            <Button disabled={isDisabledStep} onClick={prevStep}>
              Prev
            </Button>
            <Button onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

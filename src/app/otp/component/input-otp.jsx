"use client"

import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import {useContext,forwardRef} from "react"

import { cn } from "@/app/otp/lib_otp/utils"

const InputOTP = forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      "flex-wrap",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", "w-full sm:w-auto", className)}
    {...props} />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-wrap items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    (<div
      ref={ref}
      className={cn(
        "relative flex h-12 w-12 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className,
        "sm:h-9 sm:w-9 sm:text-sm"
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>)
  );
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = forwardRef(({ ...props }, ref) => (
  <div ref={ref} role="separator" className="my-2" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }

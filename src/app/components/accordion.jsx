"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/app/_utils/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b last:border-b-0 bg-[#E5C14E] border-2 border-[#352B1E] text-[#352B1E] text-lg rounded-xl w-full",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="relative flex items-center">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative flex w-full items-center justify-center py-4 px-4 text-md font-medium transition-all text-center [&[data-state=open]>svg]:rotate-180 rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="absolute right-4 h-4 w-4 shrink-0 text-black transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4 py-2 bg-yellow-200 rounded-b-lg",
      className
    )}
    {...props}
  >
    <div className={cn("pb-4 pt-0 text-black", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

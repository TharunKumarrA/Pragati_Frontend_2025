"use client";
import {forwardRef} from "react";
import {Indicator,Root} from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/app/utils/utils";

const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </Indicator>
  </Root>
));

Checkbox.displayName = Root.displayName;

export { Checkbox };

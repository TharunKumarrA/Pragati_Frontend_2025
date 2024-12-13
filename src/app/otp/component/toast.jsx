"use client";
import {Provider,Viewport,Root,Action,Title,Close,Description} from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import {forwardRef} from "react";

import { cn } from "@/app/signup/components/lib/utils";

const ToastProvider = Provider;

const ToastViewport = forwardRef(({ className, ...props }, ref) => (
  <Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-white text-black",
        destructive:
          "destructive group border-red-800 bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = Root.displayName;

const ToastAction = forwardRef(({ className, ...props }, ref) => (
  <Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-white px-3 text-sm font-medium text-white transition-colors hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = Action.displayName;

const ToastClose = forwardRef(({ className, ...props }, ref) => (
  <Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-white opacity-90 transition-opacity hover:text-gray-300 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" />
  </Close>
));
ToastClose.displayName = Close.displayName;

const ToastTitle = forwardRef(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn("text-lg font-semibold [&+div]:text-base", className)} // Increased font size
    {...props}
  />
));
ToastTitle.displayName = Title.displayName;

const ToastDescription = forwardRef(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("text-base opacity-90", className)} // Increased font size
    {...props}
  />
));
ToastDescription.displayName = Description.displayName;

export {
  Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport
};


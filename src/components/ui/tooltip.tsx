import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

export function Tooltip({
	children,
	content,
	open,
	defaultOpen,
	onOpenChange,
	...props
}:any) {
	return (
		<TooltipPrimitive.Root
			open={open}
			defaultOpen={defaultOpen}
			onOpenChange={onOpenChange}
		>
			<TooltipPrimitive.Trigger asChild>
				{children}
			</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Content side="bottom" align="center" {...props}>
				{content}
				<TooltipPrimitive.Arrow width={11} height={5} />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Root>
	);
}

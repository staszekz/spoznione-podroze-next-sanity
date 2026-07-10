import { useStore } from "@nanostores/react";
import { cn } from "@/lib/utils";
import type { ContinentSummary } from "@/sanity/lib/queries";
import { $activeContinent } from "@/stores/activeContinent";

interface ContinentPillsProps {
	continents: ContinentSummary[];
	defaultId: string;
}

export default function ContinentPills({
	continents,
	defaultId,
}: ContinentPillsProps) {
	const selected = useStore($activeContinent) ?? defaultId;

	return (
		<div className="-mx-5 flex gap-2.5 overflow-x-auto px-5 py-3.5 md:mx-0 md:flex-wrap md:px-0 [scrollbar-width:none]">
			{continents.map((continent) => {
				const active = continent._id === selected;
				return (
					<button
						key={continent._id}
						type="button"
						aria-pressed={active}
						onClick={() => $activeContinent.set(continent._id)}
						className={cn(
							"flex-none cursor-pointer rounded-full border px-[18px] py-[9px] text-sm font-semibold transition-colors",
							active
								? "border-foreground bg-foreground text-background"
								: "border-border bg-card text-nav-foreground hover:border-border-strong",
						)}
					>
						{continent.name}
					</button>
				);
			})}
		</div>
	);
}

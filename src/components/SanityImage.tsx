import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/queries";

interface SanityImageProps {
	image: SanityImageType | null | undefined;
	width: number;
	height: number;
	className?: string;
	loading?: "lazy" | "eager";
	fetchPriority?: "high" | "auto";
}

/** Renders a Sanity image, or the prototype's diagonal-stripe placeholder when missing. */
export default function SanityImage({
	image,
	width,
	height,
	className,
	loading = "lazy",
	fetchPriority = "auto",
}: SanityImageProps) {
	if (!image?.asset) {
		return (
			<div
				aria-hidden="true"
				className={cn("h-full w-full", className)}
				style={{
					background:
						"repeating-linear-gradient(45deg, var(--muted) 0px, var(--muted) 14px, var(--card) 14px, var(--card) 28px)",
				}}
			/>
		);
	}

	return (
		<img
			src={urlFor(image).width(width).height(height).fit("crop").url()}
			alt={image.alt ?? ""}
			width={width}
			height={height}
			loading={loading}
			fetchPriority={fetchPriority}
			className={cn("h-full w-full object-cover", className)}
		/>
	);
}

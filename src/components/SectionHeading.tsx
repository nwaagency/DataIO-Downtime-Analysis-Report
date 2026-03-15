import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Consistent animated section heading with eyebrow, accent line, and tightened tracking.
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  eyebrowTone?: "primary" | "light";
  className?: string;
  variant?: "default" | "light";
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowTone = "primary",
  className = "",
  variant = "default",
}: SectionHeadingProps) => {
  const isCenter = align === "center";
  const eyebrowClasses =
    eyebrowTone === "light"
      ? "bg-white/10 text-white"
      : "bg-primary/10 text-primary";
  const isLight = variant === "light";

  return (
    <motion.div
      className={cn(
        "space-y-4 mb-12 md:mb-16",
        isCenter ? "text-center items-center flex flex-col" : "text-left flex flex-col items-start",
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full tracking-[0.04em] font-semibold text-sm font-mono border",
            isLight
              ? "bg-white/10 text-white border-white/15"
              : "bg-primary/10 text-primary border-primary/15",
          )}
        >
          {eyebrow}
        </div>
      )}

      <div className={cn("flex flex-col gap-3", isCenter ? "items-center" : "items-start")}>
        <h2
          className={cn(
            "text-3xl md:text-5xl font-bold tracking-tight",
            isLight ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
        <span className={cn("h-[2px] w-12 rounded-full", isLight ? "bg-white/70" : "bg-primary/80")} />
        {description && (
          <motion.p
            className={cn(
              "text-base md:text-xl leading-[1.7] font-semibold",
              isLight ? "text-blue-100" : "text-muted-foreground",
            )}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeading;

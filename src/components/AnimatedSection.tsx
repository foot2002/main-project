import { motion, Variants } from "framer-motion";

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -48 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  flipY: {
    hidden: { opacity: 0, rotateY: -18 },
    visible: { opacity: 1, rotateY: 0 },
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 12 },
    visible: { opacity: 1, rotateX: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
};

const SECTION_VARIANTS = [
  "fadeUp",
  "fadeIn",
  "slideLeft",
  "slideRight",
  "scaleUp",
  "fadeDown",
  "scaleIn",
  "flipY",
  "blurIn",
  "zoomIn",
] as const;

type VariantName = (typeof SECTION_VARIANTS)[number];

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: VariantName;
  className?: string;
  delay?: number;
}

const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const AnimatedSection = ({
  children,
  variant = "fadeUp",
  className,
  delay = 0,
}: AnimatedSectionProps) => {
  const v = variants[variant] ?? variants.fadeUp;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px -60px 0px", amount: 0.2 }}
      variants={v}
      transition={{ ...defaultTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SECTION_VARIANT_LIST = SECTION_VARIANTS;

export function getVariantForIndex(index: number): VariantName {
  return SECTION_VARIANTS[index % SECTION_VARIANTS.length];
}

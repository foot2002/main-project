import React from "react";
import { AnimatedSection, getVariantForIndex } from "./AnimatedSection";

interface AnimatedPageContentProps {
  children: React.ReactNode;
}

/**
 * Wraps each direct child in AnimatedSection with a rotating variety of
 * scroll-in animations so every section on every page animates on enter.
 */
export const AnimatedPageContent = ({ children }: AnimatedPageContentProps) => {
  return (
    <>
      {React.Children.map(children, (child, i) =>
        child != null ? (
          <AnimatedSection key={i} variant={getVariantForIndex(i)}>
            {child}
          </AnimatedSection>
        ) : null
      )}
    </>
  );
};

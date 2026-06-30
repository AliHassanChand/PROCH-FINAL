import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "motion/react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "scale-up"
  | "stagger-container";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  id?: string;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.86, // Decreased speed by 15% (increased from 0.75 to 0.86)
  threshold = 0.1,
  once = true,
  className = "",
  id,
}: ScrollRevealProps) {
  // GSAP-like ease curve for premium, silky smooth movement
  const premiumEase = [0.25, 1, 0.5, 1]; // custom cubic-bezier (out-quart)

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "fade-left": {
      hidden: { opacity: 0, x: 20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "fade-right": {
      hidden: { opacity: 0, x: -20 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.92 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "zoom-out": {
      hidden: { opacity: 0, scale: 1.08 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: premiumEase,
        },
      },
    },
    "stagger-container": {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.14, // Slower stagger interval (0.12 * 1.15)
          delayChildren: delay,
        },
      },
    },
  };

  // If we are a stagger container, we can let Framer Motion propagate active status to child motion elements
  if (variant === "stagger-container") {
    return (
      <motion.div
        id={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={variants[variant]}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants[variant]}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reusable child component for items inside a "stagger-container"
 */
export function StaggerItem({
  children,
  className = "",
  id,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  scale?: boolean;
  key?: React.Key | null;
}) {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, // slightly lower offset to minimize reflow recalculations
      scale: scale ? 0.96 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.69, // Slower individual items (0.6 * 1.15)
        ease: [0.25, 1, 0.5, 1], // premium out-quart
      },
    },
  };

  return (
    <motion.div 
      id={id} 
      variants={itemVariants} 
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

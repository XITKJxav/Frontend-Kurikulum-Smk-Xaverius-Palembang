import { useRef } from "react";
import { motion } from "framer-motion"; // Import motion
import { useInView } from "framer-motion"; // Import useInView

interface AppearFadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

const AppearOnScroll = ({
  children,
  className,
  duration = 0.4,
  delay = 0,
}: AppearFadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -20, y: -20 }} // Starts from top-left
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}} // Moves to the center
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default AppearOnScroll;

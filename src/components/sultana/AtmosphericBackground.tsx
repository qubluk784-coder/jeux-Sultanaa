import { motion } from "framer-motion";

interface AtmosphericBackgroundProps {
  className?: string;
}

export function AtmosphericBackground({ className = "" }: AtmosphericBackgroundProps) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden bg-atmospheric ${className}`}>
      {/* Subtle zellige pattern overlay */}
      <div className="absolute inset-0 pattern-zellige opacity-30" />
      
      {/* Magical particles */}
      <div className="absolute inset-0 bg-particles opacity-20" />
      
      {/* Floating accent blobs */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-96 w-96 rounded-full blur-[100px]"
        animate={{ 
          x: [0, 50, -20, 0], 
          y: [0, -30, 40, 0],
          scale: [1, 1.2, 0.9, 1] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--theme-primary)", opacity: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-32 bottom-10 h-[500px] w-[500px] rounded-full blur-[120px]"
        animate={{ 
          x: [0, -60, 30, 0], 
          y: [0, 50, -40, 0],
          scale: [1, 1.15, 1.3, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--theme-accent)", opacity: 0.12 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full blur-[90px]"
        animate={{ 
          y: [0, -100, 50, 0],
          scale: [0.8, 1.1, 0.9, 0.8] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--theme-primary)", opacity: 0.1 }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-[80px]"
        animate={{ 
          x: [0, 40, -40, 0],
          scale: [1, 0.7, 1.2, 1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundColor: "var(--theme-accent)", opacity: 0.08 }}
      />
    </div>
  );
}

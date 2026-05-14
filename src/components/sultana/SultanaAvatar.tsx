import sultana from "@/assets/sultana.png";
import { motion } from "framer-motion";

export function SultanaAvatar({ size = 160, float = true }: { size?: number; float?: boolean }) {
  return (
    <motion.img
      src={sultana}
      alt="Sultana, ton guide"
      width={size}
      height={size * 1.33}
      className={`drop-shadow-2xl ${float ? "animate-float" : ""}`}
      style={{ width: size, height: "auto" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      loading="lazy"
    />
  );
}

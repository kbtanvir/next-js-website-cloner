import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 * This is an example of layout animations in Framer Motion 2.
 *
 * It's as simple as adding a `layout` prop to the `motion.div`. When
 * the flexbox changes, the handle smoothly animates between layouts.
 *
 * Try adding whileHover={{ scale: 1.2 }} to the handle - the layout
 * animation is now fully compatible with user-set transforms.
 */

export default function App() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <>
      <div className="flex-center">
        <div
          className={cn(
            "flex w-[160px] rounded-full bg-red-400 p-[10px] transition-all duration-700",
            isOn
              ? "justify-end bg-green-400 [&>.handle]:bg-black"
              : "justify-start",
          )}
          onClick={toggleSwitch}
        >
          <motion.div
            className="handle size-[80px] rounded-full border-2 border-black"
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        </div>
      </div>
    </>
  );
}



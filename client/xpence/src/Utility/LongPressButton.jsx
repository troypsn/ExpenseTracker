import { useRef } from "react";

function LongPressButton({
  buttonName = "",
  shortPress = () => console.log("short press"),
  longPress = () => console.log("long press"),
}) {
  const holdTimeout = useRef(null);
  const activatedRef = useRef(false);
  const releasedRef = useRef(false);

  const HOLD_TIME = 1000;

  const handlePointerDown = () => {
    releasedRef.current = false;
    activatedRef.current = false;

    holdTimeout.current = setTimeout(() => {
      activatedRef.current = true;
      longPress();
    }, HOLD_TIME);
  };

  const handlePointerUp = () => {
    if (releasedRef.current) return; // ✅ prevent double fire
    releasedRef.current = true;

    if (!activatedRef.current) {
      shortPress();
    }

    clearTimeout(holdTimeout.current);
    holdTimeout.current = null;
  };

  return (
    <p
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none", touchAction: "none", cursor: "pointer" }}
    >
      {buttonName}
    </p>
  );
}

export default LongPressButton;
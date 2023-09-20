import React from "react";

export const useOptimizedEffect = (
  effect: React.EffectCallback,
  ...deps: unknown[]
) => {
  const renderCount = React.useRef(0);
  React.useEffect(() => {
    if (renderCount.current === 0) {
      effect();
      renderCount.current = 1;
    }
  }, [effect, deps]);
  return;
};

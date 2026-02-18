import { useEffect, useState } from "react";
import { Animated } from "react-native";

export default function Skeleton({ width, height, style }) {
  const [opacity] = useState(() => new Animated.Value(0.3));

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );

    loopAnimation.start();
    return () => {
      loopAnimation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={[
        { width, height, opacity, backgroundColor: "#E0E0E0", borderRadius: 8 },
        style,
      ]}
    />
  );
}

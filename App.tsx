import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

interface TimeState {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function App() {
  const [loaded, error] = useFonts({
    "Open-24-Display": require("./src/assets/fonts/Open 24 Display St.ttf"),
  });
  const [time, setTime] = useState<TimeState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatTime = (value: number): string =>
    value < 10 ? `0${value}` : value.toString();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Bilal Şen</Text>
      <View style={styles.clockContainer}>
        <Text style={styles.timerText}>{formatTime(time.hours)}</Text>
        <Text style={[styles.timerText, { minWidth: "auto" }]}>:</Text>
        <Text style={styles.timerText}>{formatTime(time.minutes)}</Text>
        <Text style={[styles.timerText, { minWidth: "auto" }]}>:</Text>
        <Text style={styles.timerText}>{formatTime(time.seconds)}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerText: {
    fontSize: 40,
    minWidth: 80,
    minHeight: 80,
    fontWeight: "500",
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: 5,
    fontFamily: "Open-24-Display",
    textAlign: "center",
    padding: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

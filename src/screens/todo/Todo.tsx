import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import todoColors from "../../theme/todo/colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Card from "../../components/todo/Card";

const Todo = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={todoColors.background}
      />
      <AnimatedCircularProgress
        size={150}
        width={13}
        fill={70}
        rotation={0}
        duration={3000}
        tintColor={todoColors.background}
        onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor={todoColors.primary}
        backgroundWidth={22}
        lineCap={"round"}
      >
        {(fill: number) => (
          <View style={styles.progressBarTextContainer}>
            <Text style={styles.progressBarText}>{Math.round(fill)}%</Text>
            <Text style={[styles.progressBarText, { fontSize: 12 }]}>
              Completed
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.firstTitleText}>Your're doing great,</Text>
      <Text style={styles.secondTitleText}>your're halfway there!</Text>
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: todoColors.background,
    paddingHorizontal: 20,
  },
  progressBarTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarText: {
    fontSize: 24,
    color: todoColors.textPrimary,
  },
  firstTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: todoColors.textPrimary,
  },
  secondTitleText: {
    fontSize: 24,
    color: todoColors.textPrimary,
  },
});

export default Todo;

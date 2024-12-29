const todoColors = {
  primary: "#9E78CF", // Progress bar, buttons, and highlight texts.
  background: "#0D0714", // General background.
  todoContainerBackground: "#1D1825", // Background for the todo container.
  textPrimary: "#9E78CF", // Main text, content guiding the user.
  textSecondary: "#FFFFFF", // Less prioritized text (e.g., completed tasks).
  completedTaskLine: "#0D0714", // For strikethrough tasks.
  buttonBackground: "#9E78CF", // Buttons like "Add Task".
  highlight: "#805AD5", // Fine details and highlight elements.

  // State Colors
  success: "#27AE60", // Successful operation
  error: "#E74C3C", // Failed operation
  warning: "#F1C40F", // Warnings

  // Todo Card Shadow Colors
  pastDue: "#520220", // Task is past due
  lessThanOneHour: "#FFAA00", // Less than 1 hour remaining
  lessThanSixHours: "#F1A103", // Less than 6 hours remaining
  lessThanTwelveHours: "#C7860A", // Less than 12 hours remaining
  lessThanOneDay: "#8E0C13", // Less than 1 day remaining
};

export default todoColors;

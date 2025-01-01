const getBackMessage = (progress: number) => {
  const progressMessages: { [key: number]: string[] } = {
    0: [
      "Nothing has started yet. Let's get started!",
      "No progress on the task. Now is the perfect time!",
      "You need to get going, take the first step.",
      "Create an opportunity to take action!",
      "Not started yet. Start the process with the first step.",
      "Take action to realize your plans!",
    ],
    20: [
      "You made a great start, keep going!",
      "The momentum gained brings you closer to success.",
      "Things are starting to become clearer now, you're doing great.",
      "You started to see the results of the first steps.",
      "Keep your motivation and keep moving forward.",
      "Your effort is starting to pay off, keep it up!",
      "Every step brings you closer to your goal.",
      "You are progressing steadily on the road.",
      "You are progressing solidly towards success.",
      "Continue on the road with the determination you started!",
    ],
    40: [
      "You took a big step towards your goal.",
      "You have successfully completed a significant part of the road.",
      "You continue to make progress, it's going great.",
      "You are maintaining your consistency on the way to success.",
      "If you continue like this, your goal is very close.",
      "Your determination makes a difference in progress.",
      "Your motivation and effort are carrying you to success.",
      "You have managed to leave a large part of the road behind.",
      "If you continue steadily, you will reach your goal.",
      "The results you achieved are a testament to your effort!",
    ],
    60: [
      "You have made great progress on the way to success.",
      "Most of the road is completed, now the final parts are left.",
      "The progress looks great, keep it up.",
      "Your effort up to this point is commendable.",
      "Believe in yourself, you are one step closer to success.",
      "You have left most of the road behind, keep your motivation.",
      "Your consistency in the task is remarkable, keep going.",
      "Everything is going well, success is waiting for you.",
      "Your determined progress is dazzling!",
      "Keep pushing, the finish line is in sight!",
    ],
    80: [
      "You are almost there, just a little more effort!",
      "80% done! The goal is within reach.",
      "You have come so far, don't stop now!",
      "The finish line is so close, keep going!",
      "Your hard work is paying off, just a bit more!",
      "You are in the final stretch, stay focused!",
      "80% completed! Your success is imminent.",
      "Almost there, keep up the great work!",
      "You are on the verge of success, keep pushing!",
      "Just a little more effort and you'll achieve your goal!",
    ],
    100: [
      "Congratulations! You have achieved your goal!",
      "100% completed! Your hard work has paid off.",
      "You did it! All your efforts have led to success.",
      "Goal achieved! Celebrate your accomplishment.",
      "You have reached the finish line, well done!",
      "Success! You have completed your task.",
      "Your dedication has led to this moment, congratulations!",
      "You have accomplished your goal, fantastic job!",
      "All your hard work has culminated in success, well done!",
      "You have achieved what you set out to do, congratulations!",
    ],
  };

  const messages = Math.floor(progress / 20) * 20;
  const randomIndex = Math.floor(
    Math.random() * progressMessages[messages].length
  );
  return progressMessages[messages][randomIndex];
};

export default getBackMessage;

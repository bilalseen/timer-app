import Toast from "react-native-toast-message";
import Colors from "../theme/colors";

interface ToastMessageProps {
  type: string;
  text1: string;
  text2?: string;
  textColor?: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  type,
  text1,
  text2,
  textColor,
}) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
    text1Style: {
      fontSize: 14,
      fontFamily: "Satoshi-Medium",
      color: textColor ? textColor : Colors.textPrimary,
    },
    text2Style: {
      fontFamily: "Satoshi-Regular",
    },
  });
  return null;
};

export default ToastMessage;

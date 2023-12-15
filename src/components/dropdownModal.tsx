import {
  Modal,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import SmallText from "./smallText";
import { shadowBox, shadowBoxDark } from "../style/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const DropdownMenu = ({
  isVisible,
  onClose,
  onSelectOption,
  position,
  options,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSelectOption: (type: string) => void;
  position: any;
  options: string[];
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1">
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              style={[
                {
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 10,
                },
                darkMode ? shadowBox : shadowBoxDark,
                position,
              ]}
            >
              <View
                style={{
                  backgroundColor: darkMode ? "#0f0f0f" : "white",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 10,
                      //   borderBottomWidth: 1,
                      //   borderBottomColor: "#626262",
                    }}
                    onPress={() => {
                      onSelectOption(option);
                      onClose();
                    }}
                  >
                    <SmallText className="text-primary">{option}</SmallText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

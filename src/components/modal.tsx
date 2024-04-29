import { View, Text, Modal as NativeModal } from "react-native";
import { width } from "../utility/constant";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { shadowBox } from "../style/Typography";

interface IProps {
  showModal?: boolean;
  children: React.ReactNode | React.ReactNode[];
  full?: boolean;
}

const Modal: React.FC<IProps> = ({
  showModal = false,
  children,
  full = false,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.auth);
  if (showModal) {
    return (
      <NativeModal transparent={true} visible={true}>
        <View
          className="flex flex-1 justify-center items-center z-[999]"
          // style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View
            className="flex h-auto flex-col"
            style={{
              width: full ? width : width - 50,
              zIndex: 9999999,
              borderRadius: full ? 0 : 15,
              backgroundColor: darkMode ? "black" : "white",
              ...shadowBox,
            }}
          >
            {children}
          </View>
        </View>
      </NativeModal>
    );
  } else {
    return null;
  }
};

export default Modal;

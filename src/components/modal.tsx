import { View, Text, Modal as NativeModal } from "react-native";
import { width } from "../utility/constant";

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
  if (showModal) {
    return (
      <NativeModal transparent={true} visible={true}>
        <View
          className="flex flex-1 justify-center items-center z-[999]"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <View
            className="flex h-auto bg-white  flex-col"
            style={{
              width: full ? width : width - 50,
              zIndex: 9999999,
              borderRadius: full ? 0 : 15,
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

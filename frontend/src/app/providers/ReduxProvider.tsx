"use client"; // Ensure this runs on the client side

import { Provider } from "react-redux";
import { store } from "@/redux/store/store"; // Import your Redux store

interface Props {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store} >{children}</Provider>;
};

export default ReduxProvider;
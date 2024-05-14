import { createContext, useContext, useMemo, useReducer } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = "MyContext";

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, userLogin: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function MyContextControllerProvider({ children }) {
  const initialState = {
    userLogin: null,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}

function useMyContextController() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMycontextController should be used inside the MyContextControllerProvider."
    );
  }
  return context;
}

const USERS = firestore().collection("USERS");

const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email).onSnapshot((u) => {
        const value = u.data();
        dispatch({ type: "USER_LOGIN", value });
      });
    })
    .catch((e) => alert("Sai user va password"));
};

const logout = (dispatch,navigation) => {
    dispatch({ type: "USER_LOGIN", value: null });
    navigation.navigate('Login');
};

const createAccount = (email, password, fullname, navigation) => {
    if (!email || !password || !fullname) {
            Alert.alert("All fields are required");
            return;
        }
    auth().createUserWithEmailAndPassword(email, password, fullname)
        .then(() => {
            Alert.alert("Tạo tài khoản thành công với email: " + email);
            USERS.doc(email).set({ email, password, fullname });
            navigation.navigate('Login');
        })
        .catch(error => console.log(error.message));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  createAccount,
};

import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "@/store/authSlice";
import { wrapper, useAppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      await store.dispatch(setAuthState(false));
      console.log("State on server", store.getState());
      return {
        props: {
          authState: false,
        },
      };
    }
);
const Home: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const handleTest = async () => {
    // const res = await dispatch(getCategory(1));
    // console.log('--handleTest-', res)
  }
  return (
    <div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>
      <button onClick={handleTest}>AAAA</button>
    </div>
  );
};

export default Home;
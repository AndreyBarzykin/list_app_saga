import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userDataRequest } from "./redux/sagas/userData";
import AuthForm from "./components/AuthForm";
import styles from "./style/common.module.scss";
import Layout from "./components/Layout/Layout";
import Card from "./components/Card/Card";
import { checkIsAuthRequest } from "./redux/sagas/auth";
import AddCardForm from "./components/AddCardForm/AddCardForm";
import Loader from "./components/Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  const { userDataReducer, authReducer } = useSelector((store) => store);

  useEffect(() => {
    if (authReducer.isAuth && localStorage.getItem("accessToken"))
      dispatch(checkIsAuthRequest());
    // dispatch(userDataRequest());
  }, []);

  return (
    <div className={styles.App}>
      {!authReducer.isAuth ? (
        <div className={styles.container}>
          <AuthForm />
        </div>
      ) : (
        <Layout>
          {!userDataReducer.loading && !authReducer.isLoading ? (
            <>
              <AddCardForm />
              {userDataReducer.lists.map((list) => (
                <Card key={list._id} list={list} />
              ))}
            </>
          ) : (
            <Loader width={"75px"} />
          )}
        </Layout>
      )}
    </div>
  );
};

export default App;

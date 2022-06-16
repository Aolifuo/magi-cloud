import {
  FC,
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useEffect,
  useReducer,
} from 'react';
import { loginStatus } from '@/util/request/api';

interface IUserDetail {
  uid: number;
  nickname: string;
  avatarUrl: string;
}

interface IUserState {
  userDetail: IUserDetail;
}

interface IAction {
  type: 'set-user-state';
  data: any;
}

type IUserContextValue = [IUserState, Dispatch<IAction>];

const userStateReducer: Reducer<IUserState, IAction> = (prevState, action) => {
  const { data } = action;
  if ((data ?? null) === null) {
    return prevState;
  }
  switch (action.type) {
    case 'set-user-state': {
      const userDetail: IUserDetail = {
        uid: data.account.id,
        nickname: data.profile.nickname,
        avatarUrl: data.profile.avatarUrl,
      };

      return {
        userDetail,
      };
    }
    default:
      return prevState;
  }
};

const UserContext = createContext({} as IUserContextValue);

const UserStateProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userState, userDispatch] = useReducer(userStateReducer, {} as IUserState);

  // 获取登陆状态
  useEffect(() => {
    loginStatus()
      .then((data) => {
          if (!(data?.data?.account ?? null)) {
            return;
          }
          userDispatch({ type: 'set-user-state', data: data.data });
        });
  }, []);

  return (
    <UserContext.Provider value={[userState, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserStateProvider;
export { UserContext };
export type { IUserState };

import { create } from 'zustand'

interface UserState {
  id: string;
  name: string;
  email: string;
}

type UserStore = {
  user: UserState;
  setUserInfos: (userInfo: UserState) => void;
}



const useStore = create<UserStore>((set) => ({
  user: { id: '', name: '', email: '' },
  setUserInfos: (userInfo) => set({ user: userInfo }),
}))

export default useStore
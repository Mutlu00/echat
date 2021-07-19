// export default 0
import { immer } from '../utils/immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type DarkMode = {
  theme: boolean;
  changeTheme: () => void;
  startTheme: () => void;
};

const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
}

const useDarkModeStore = create<DarkMode>(
  persist(
    immer(
      (set): DarkMode => ({
        theme: true,
        changeTheme: () =>
          set((state) => {
            if (!state.theme) {
              state.theme = true;
              document.querySelector('html')?.classList?.add?.('dark');
            } else {
              state.theme = false;
              document.querySelector('html')?.classList?.remove?.('dark');
            }
          }),
        startTheme: () => set((state) => {
          console.log(state.theme)
          if (state.theme) {
            document.querySelector('html')?.classList?.add?.('dark');
            state.theme = true;
          } else {
            document.querySelector('html')?.classList?.remove?.('dark');
            state.theme = false;
          }
        }),
      })
    ),
    {
      name: 'DarkMode-Store',
      getStorage: typeof window !== 'undefined' ? window.localStorage : dummyStorageApi as any,
    }
  )
);

export default useDarkModeStore;

import useDarkModeStore from '../../store/DarkModeStore';
import { useEffect, useState } from 'react';

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};


export const DarkModeSwitch: React.FC = () => {
  const hasHydrated = useHasHydrated();

  const theme = useDarkModeStore((state) => state.theme);
  const changeTheme = useDarkModeStore((state) => state.changeTheme);
  const startTheme = useDarkModeStore((state) => state.startTheme);

  useEffect(() => {
    startTheme();
  }, []);

  return (
      <button
        type='button'
        className='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        role='switch'
        aria-checked={hasHydrated && theme}
        onClick={changeTheme}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute bg-white w-full h-full rounded-md'
        ></span>
        <span
          aria-hidden='true'
          className={`${
            hasHydrated && theme ? 'bg-indigo-600' : 'bg-gray-200'
          } pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200`}
        ></span>
        <span
          aria-hidden='true'
          className={`${
            hasHydrated && theme ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200`}
        ></span>
      </button>
  );
};

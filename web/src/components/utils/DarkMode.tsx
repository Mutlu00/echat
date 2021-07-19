import useDarkModeStore from '../../store/DarkModeStore';
import { useEffect } from 'react';

export const DarkModeSwitch: React.FC = () => {
  const theme = useDarkModeStore((state) => state.theme);
  const changeTheme = useDarkModeStore((state) => state.changeTheme);
  const { startTheme } = useDarkModeStore();

  useEffect(() => {
    startTheme();
  }, [theme]);

  // console.log(theme);
  return (
    <>
    {/* {console.log(theme)} */}
      <button
        type='button'
        className='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        role='switch'
        aria-checked={theme}
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
            theme ? 'bg-indigo-600' : 'bg-gray-200'
          } pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200`}
        ></span>
        <span
          aria-hidden='true'
          className={`${
            theme ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200`}
        ></span>
      </button>
    </>
    // <Switch
    //   checked={theme}
    //   onChange={changeTheme}
    //   className='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
    // >
    //   <span className='sr-only'>Use setting</span>
    //   <span
    //     aria-hidden='true'
    //     className='pointer-events-none absolute bg-white w-full h-full rounded-md'
    //   />
    //   <span
    //     aria-hidden='true'
    //     className={`${
    //       theme ? 'bg-indigo-600 dark:bg-indigo-600' : 'bg-gray-200'
    //     } pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200`}
    //   />
    //   <span
    //     aria-hidden='true'
    //     className={`${
    //       theme ? 'translate-x-5' : 'translate-x-0'
    //     } pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200`}
    //   />
    // </Switch>
  );
};
// export default null

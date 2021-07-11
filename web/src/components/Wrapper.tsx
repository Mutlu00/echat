interface WrapperProps {
  height?: 'full' | 'screen';
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  height = 'screen',
}) => {
  return (
    <div
      className={`
      ${height === 'full' ? 'min-h-full' : 'min-h-screen'} 
      bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8
      `}
    >
      {children}
    </div>
  );
};

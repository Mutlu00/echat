import 'tailwindcss/tailwind.css';
import { NavBar } from '../components/NavBar';
import './_app.css';

const App = ({ Component, pageProps }: any) => {
  return <Component {...pageProps} />;
};

export default App;

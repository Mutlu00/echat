import { NavBar } from '../components/NavBar';
import { withApollo } from '../utils/withApollo';

const Index = () => (
  <>
    <NavBar />
    <div>hello World</div>
  </>
);

export default withApollo({ ssr: false })(Index);

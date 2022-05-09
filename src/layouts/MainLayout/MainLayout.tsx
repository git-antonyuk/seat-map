import './MainLayout.css';
import { Layout } from 'antd';
import Map from '../../components/Map/Map';

const { Header, Footer } = Layout;

function MainLayout() {
  const getFullYear = () => {
    const date = new Date();
    return date.getFullYear();
  };
  return (
    <Layout>
      <Header>Seat Builder</Header>
      <Layout>
        <Map />
      </Layout>
      <Footer>
        <p>
          Seat Builder
          {' '}
          {getFullYear()}
        </p>
      </Footer>
    </Layout>
  );
}

export default MainLayout;

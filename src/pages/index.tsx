import CCMainLayout from '@/layouts/main/MainLayout';

const CCHome = () => {
  return <></>;
};

CCHome.getLayout = (page: React.ReactElement) => (
  <CCMainLayout> {page} </CCMainLayout>
);

export default CCHome;

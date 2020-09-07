import Header from '../components/header';
import Footer from '../components/footer';

export default function withLayout({ children }: { children: any }): JSX.Element {
  return (
    <>
      <Header isStatic={true} />
      <main className=''>
        {children}
      </main>
      <Footer />
    </>
  );
}

import Header from '../components/header';

export default function withLayout({ children }: { children: any }): JSX.Element {
  return (
    <>
      <Header />
      <main className='view-margin'>
        {children}
      </main>
    </>
  );
}

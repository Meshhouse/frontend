import Header from '../components/header';

export default function withLayout({ children }: { children: any }): JSX.Element {
  return (
    <>
      <Header isStatic={false} />
      <main className='view-margin'>
        {children}
      </main>
    </>
  );
}

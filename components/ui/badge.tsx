export default function Badge(props: any): JSX.Element {
  return (
    <div className="badge">
      {props.children}
    </div>
  );
}

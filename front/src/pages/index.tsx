import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <>
      <Link to="/tasks">Tasks</Link>
    </>
  );
}

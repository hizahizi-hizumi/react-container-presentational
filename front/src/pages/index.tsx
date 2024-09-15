import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <div>
      <Link to="/tasks">Tasks</Link>
    </div>
  );
}

import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h2>Oops!</h2>
      <p>Ufff! que buen error, se merecen un 5</p>
    </div>
  );
}
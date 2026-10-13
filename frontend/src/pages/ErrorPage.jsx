import { Header } from "../componenets/Header";
import './ErrorPage.css';

export function ErrorPage({ cart }) {
  return (
    <>
      <title>Error</title>
      <link rel="icon" href="error-favicon.png" />

      <Header cart={cart} />
      <div className="error-container">
        <div className="error-message">Page not Found</div>
      </div>
    </>
  );
}
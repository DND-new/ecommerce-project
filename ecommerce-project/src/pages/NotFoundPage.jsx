import { Header } from "../components/Header";

export function NotFoundPage(cart) {
  return (
    <>
      <title>404 Page Not Found</title>

      <Header cart={cart} />

      <div>
        <p>Page not found</p>
      </div>
    </>
  );
}

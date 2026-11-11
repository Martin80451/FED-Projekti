import Link from "next/link";

type NotFoundProps = {
  title?: string;
  message?: string;
};

export default function NotFound({
  title = "Page not found",
  message = "The page you’re looking for doesn’t exist or may have been moved.",
}: NotFoundProps) {
  return (
    <main>
      <p>404</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <Link href="/">Return to dashboard</Link>
    </main>
  );
}

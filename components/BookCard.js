import { Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/works/${workId}.json`
  );

  if (isLoading) {
    return null;
  }

  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            'https://placehold.co/300x400?text=Cover+Not+Available';
        }}
        className="img-fluid"
        src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
        alt="Cover Image"
      />
      <Card.Body>
        <Card.Title>{data.title || ''}</Card.Title>
        <Card.Text>{data.first_published_date || 'N/A'}</Card.Text>
        <Link href={`/works/${workId}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
}
import { Card } from 'react-bootstrap';

export default function PageHeader(props) {
  const { text, subtext } = props;

  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h1 className="mb-2">{text}</h1>
          {subtext && <p className="text-muted mb-0">{subtext}</p>}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
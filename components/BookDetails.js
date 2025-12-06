import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails(props) {
  const { book, workId, showFavouriteBtn = true } = props;
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                'https://placehold.co/400x600?text=Cover+Not+Available';
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />
        </Col>
        <Col lg={8}>
          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === 'string'
                ? book.description
                : book.description.value}
            </p>
          )}
          <br />

          {book.subject_people && (
            <>
              <h5>Characters</h5>
              {book.subject_people.join(', ')}
              <br />
              <br />
            </>
          )}

          {book.subject_places && (
            <>
              <h5>Settings</h5>
              {book.subject_places.join(', ')}
              <br />
              <br />
            </>
          )}

          {book.links && book.links.length > 0 && (
            <>
              <h5>More Information</h5>
              {book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))}
              <br />
            </>
          )}

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
              className="w-100 py-2"
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}
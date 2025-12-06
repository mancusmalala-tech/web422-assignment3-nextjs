
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  const queryString = new URLSearchParams(router.query).toString();

  const { data, error } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }

  // Build subtext from query parameters
  function getSubtext() {
    if (!router.query || Object.keys(router.query).length === 0) {
      return '';
    }

    const params = [];
    Object.keys(router.query).forEach((key) => {
      const value = router.query[key];
      const formattedKey = key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      params.push(`${formattedKey}: ${value}`);
    });

    return params.join(', ');
  }

  return (
    <>
      <PageHeader text="Search Results" subtext={getSubtext()} />
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData?.docs?.map((book, index) => (
            <tr key={index} onClick={() => router.push(`${book.key}`)}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
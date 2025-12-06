import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  try {
    const response = await fetch('https://openlibrary.org/works/OL453657W.json');
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    const data = await response.json();

    return {
      props: {
        book: data,
      },
      revalidate: 60
    };
  } catch (error) {
    return {
      props: {
        book: null,
      },
      revalidate: 60
    };
  }
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Yigit Dalkilic" />
      <p>
        Hello! I&apos;m Yigit Dalkilic, a web development student at Seneca
        Polytechnic, currently learning React and Next.js through this WEB422
        course. I&apos;m passionate about building modern web applications and
        exploring new technologies.
      </p>
      {props.book && (
        <>
          <p>
            For this assignment, I chose to feature &quot;The Colour of Magic&quot;
            by Terry Pratchett, the first novel in the beloved Discworld series.
            This fantasy novel introduces readers to the magical Discworld and its
            memorable characters, including the incompetent wizard Rincewind and the
            tourist Twoflower.
          </p>
          <BookDetails
            book={props.book}
            workId="OL453657W"
            showFavouriteBtn={false}
          />
        </>
      )}
    </>
  );
}

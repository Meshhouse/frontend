import { Link } from '../../i18n';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ModelPaginator = (props: any) => {
  console.log(props);
  const category = props.route.query.category;
  const currentPage = isNaN(Number(props.match.params.page)) ? 1 : Number(props.match.params.page);
  const totalPages = props.totalPages + 1;

  function generateLink(idx: number): string {
    return `/models/${category}`
    + (currentPage - 1 === 0 ? '' : `?page=${(currentPage - 1) + idx}`);
  }

  return (
    <Pagination size='lg'>
      <PaginationItem disabled={currentPage === 1}>
        <Link
          href={`/models/${category}`}
          passHref
        >
          <PaginationLink
            first
            to={`/models/${category}`}
          />
        </Link>
      </PaginationItem>
      <PaginationItem disabled={currentPage === 1}>
        <Link
          href={`/models/${category}`}
          passHref
        >
          <PaginationLink
            previous
            to={`/models/${category}`}
          />
        </Link>
      </PaginationItem>
      {[...Array(5)].map((item: any, idx: number) => (
        (currentPage - 1) + idx < totalPages - 1 && (
          <PaginationItem
            key={`paginator-item-${idx}`}
          >
            <Link
              href={generateLink(idx)}
              passHref
            >
              <PaginationLink
                to={generateLink(idx)}
              >
                {currentPage + idx}
              </PaginationLink>
            </Link>
          </PaginationItem>
        )
      ))}
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <Link
          href={`/models/${category}?page=${(Number(props.match.params.page) ?? 0) + 1}`}
          passHref
        >
          <PaginationLink
            previous
            to={`/models/${category}?page=${(Number(props.match.params.page) ?? 0) + 1}`}
          />
        </Link>
      </PaginationItem>
      <PaginationItem disabled={currentPage === totalPages - 1}>
        <Link
          href={`/models/${category}?page=${totalPages}`}
          passHref
        >
          <PaginationLink
            previous
            to={`/models/${category}?page=${totalPages}`}
          />
        </Link>
      </PaginationItem>
    </Pagination>
  );
};

export default ModelPaginator;

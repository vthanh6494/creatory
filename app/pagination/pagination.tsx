import { usePagination, DOTS } from "./usePagination";
import s from "./pagination.module.css";

interface Props {
  onPageChange: (param: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}
const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={s.paginationContainer}>
      <li
        className={[s.paginationItem, currentPage === 1 ? s.disabled : ""].join(
          " "
        )}
        onClick={onPrevious}
      >
        <div className={[s.arrow, s.left].join(" ")} />
      </li>
      {paginationRange.map((pageNumber: any, idx: number) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`${pageNumber}${idx}`} className={s.dots}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`${pageNumber}${idx}`}
            className={[
              s.paginationItem,
              pageNumber === currentPage ? s.selected : "",
            ].join(" ")}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={[
          s.paginationItem,
          currentPage === lastPage ? s.disabled : "",
        ].join(" ")}
        onClick={onNext}
      >
        <div className={[s.arrow, s.right].join(" ")} />
      </li>
    </ul>
  );
};

export default Pagination;

import style from "./Pagination.module.css";
import ReactPaginate from "react-paginate";
export default function Pagination({ handlePageClick, pageCount }) {
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName={style.active}
        containerClassName={style.container}
        disabledClassName={style.disabled}
      />
    </div>
  );
}

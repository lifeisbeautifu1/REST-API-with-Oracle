import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import { useSessionsContext } from "../contexts/sessionsContext";

interface PaginateItemsProps {
  itemsPerPage: number;
}

const PaginateItems: React.FC<PaginateItemsProps> = ({ itemsPerPage }) => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const {
    sessionsState: {
      sessions,
      filteredSessions,
      sort_num,
      sort_sessnum,
      sort_sub1,
      sort_sub2,
      sort_sub3,
    },
    sessionsDispatch: dispatch,
  } = useSessionsContext();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    filteredSessions.slice(itemOffset, endOffset);
    dispatch({
      type: "SET_CURRENT_SESSIONS",
      payload: filteredSessions.slice(itemOffset, endOffset),
    });
    setPageCount(Math.ceil(filteredSessions.length / itemsPerPage));
  }, [
    itemOffset,
    dispatch,
    itemsPerPage,
    sessions,
    filteredSessions,
    sort_num,
    sort_sessnum,
    sort_sub1,
    sort_sub2,
    sort_sub3,
  ]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredSessions.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="Previous"
      pageClassName="page-item"
      pageLinkClassName="page-link py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      previousClassName="page-item "
      previousLinkClassName="rounded-tl rounded-bl page-link py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      nextClassName="page-item"
      nextLinkClassName="rounded-tr rounded-br page-link py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      containerClassName="inline-flex -space-x-px rounded my-10"
      activeClassName="active"
      // renderOnZeroPageCount={null}
    />
  );
};

export default PaginateItems;

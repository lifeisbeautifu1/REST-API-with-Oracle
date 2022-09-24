import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

import { useStudentsContext } from '../contexts/studentsContext'

interface PaginateItemsProps {
    itemsPerPage: number
}

const PaginateItems: React.FC<PaginateItemsProps> = ({ itemsPerPage }) => {
    
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const { studentsState: {students, sort_id, sort_year, sort_plate, sort_money, sort_mb, sort_fname, sort_bday, sort_address}, studentsDispatch: dispatch } = useStudentsContext();
   
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
        dispatch({type: 'SET_CURRENT_STUDENTS', payload: students.slice(itemOffset, endOffset) })
      setPageCount(Math.ceil(students.length / itemsPerPage));
    }, [itemOffset, dispatch, itemsPerPage, students, sort_id, sort_year, sort_plate, sort_mb, sort_money, sort_fname, sort_bday, sort_address]);
  

    const handlePageClick = (event: any) => {
      const newOffset = event.selected * itemsPerPage % students.length;
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
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        //   renderOnZeroPageCount={null}
        />
      
    );
  }

  export default PaginateItems;
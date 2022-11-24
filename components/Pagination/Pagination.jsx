import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ handlePageClick, pageCount, perPage, currentPage }) => {
    const page = currentPage - 1;

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={(
                    <FaChevronRight />
                )}
                onPageChange={handlePageClick}
                pageRangeDisplayed={perPage}
                pageCount={pageCount}
                previousLabel={(
                    <FaChevronLeft />
                )}
                previousClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[40px] h-[40px] flex items-center justify-center rounded-full"
                nextClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[40px] h-[40px] flex items-center justify-center rounded-full" 
                renderOnZeroPageCount={null}
                className="flex gap-2 text-base items-center text-dark-100"
                activeClassName="font-bold bg-[#272541] text-white w-[40px] h-[40px] flex items-center justify-center rounded-full"
                pageClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[40px] h-[40px] flex items-center justify-center rounded-full"
                forcePage={page}
            />
        </>
    );
};

Pagination.propTypes = {
    handlePageClick: propTypes.func,
    pageCount: propTypes.number,
    perPage: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
    ]),
    currentPage: propTypes.number,
}

Pagination.defaultProps = {
    handlePageClick: () => {},
    pageCount: 10,
    perPage: 5,
    currentPage: 1,
}

export default Pagination;

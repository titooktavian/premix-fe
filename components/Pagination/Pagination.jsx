import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ handlePageClick, pageCount, currentPage }) => {
    const page = currentPage - 1;

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel={(
                    <FaChevronRight />
                )}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={(
                    <FaChevronLeft />
                )}
                previousClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:text-base text-sm"
                nextClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:text-base text-sm" 
                renderOnZeroPageCount={null}
                className="flex gap-2 text-base items-center text-dark-100"
                activeClassName="font-bold bg-[#272541] text-white w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:text-base text-sm"
                pageClassName="font-bold bg-white border-[1px] border-[#DFDFDF] w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center rounded-full md:text-base text-sm"
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

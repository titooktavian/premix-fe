import { useStateContext } from "context/StateContext";
import { getTransactionList } from "helpers/api";
import { catchError } from "helpers/formatter";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AlertService } from "services";
import { endDate, filterDataInit, startDate } from "../utils";

export const useFetchTransaction = ({ customerNo, merchantCode, isHistory = false }) => {
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFiltered, setIsFiltered] = useState(false);
    const [transactionData, setTransactionData] = useState([]);
    const [filterData, setFilterData] = useState(filterDataInit);
    const [searchKey, setSearchKey] = useState("");

    const firstUpdate = useRef(true);

    const { onSetBgColor, setLoading } = useStateContext();

    useEffect(() => {
        onSetBgColor("md:bg-neutral-100");
        return () => onSetBgColor();
    }, []);

    useEffect(() => {
        handleFetchInit();
    }, [filterData]);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        const delaySearch = setTimeout(() => {
            handleFetchInit();
        }, 500);
        return () => clearTimeout(delaySearch);
    }, [searchKey]);

    const handleFetchInit = () => {
        setLoading(true);
        setHasMoreData(true);
        setCurrentPage(1);
        handleFetchTransactionList(true);
    };

    const handleApplyFilter = (payload) => {
        setIsFiltered(true);
        setFilterData(payload);
    };

    const handleResetFilter = () => {
        setIsFiltered(false);
        setFilterData(filterDataInit);
    };

    const handleFetchTransactionList = async (isInit = false) => {
        let page = currentPage + 1;
        if (isInit) page = 1;
        try {
            let payload = {
                per_page: 10,
                page,
                is_history: isHistory,
                sort: 'DESC',
                order: 'date',
                start: startDate,
                end: endDate,
                customer_no: customerNo,
                is_dine_in: false,
            };

            if (filterData.startDate) payload = { ...payload, start: filterData.startDate };
            if (filterData.endDate) payload = { ...payload, end: filterData.endDate };
            if (filterData.status) payload = { ...payload, status_order: filterData.status };
            if (searchKey) payload = { ...payload, search: encodeURIComponent(searchKey) };

            const res = await getTransactionList(merchantCode, payload);
            if (!res.status) throw new Error(res.msg);
            if (res.meta.current_page === res.meta.last_page) setHasMoreData(false);
            setTransactionData(prevState => isInit ? res.data : [...prevState, ...res.data]);
            setCurrentPage(page);
        } catch (error) {
            AlertService.error(catchError(error));
        } finally {
            setDataIsLoaded(true);
            setLoading(false);
        }
    };

    return {
        dataIsLoaded,
        hasMoreData,
        isFiltered,
        transactionData,
        searchKey,
        setSearchKey,
        handleApplyFilter,
        handleResetFilter,
        handleFetchTransactionList,
    }
};

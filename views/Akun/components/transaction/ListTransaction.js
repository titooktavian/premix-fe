import { useEffect, useState } from "react";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import ModalDetailTransaction from "../modal/DetailTransaction";
import TransactionItem from "./TransactionItem";
import { TransaksiItem as TransaksiItemSkeleton } from "views/Akun/skeleton/Transaksi";
import { AlertService } from "services";
import { catchError } from "helpers/formatter";
import { getOutletInfo, getTransactionDetail } from "helpers/api";
import { useStateContext } from "context/StateContext";

const ScrollLoader = () => (
    <>
        <TransaksiItemSkeleton />
        <TransaksiItemSkeleton />
    </>
);

const ListTransaction = ({
    transactionData,
    hasMoreData,
    merchantCode,
    onFetchData,
}) => {
    const [showDetail, setShowDetail] = useState(false);
    const [isLoadingDetail, setIsLoadingDetail] = useState(false);
    const [detailData, setDetailData] = useState({});
    const { transactionNumber, setTransactionNumber } = useStateContext();

    if (transactionData.length === 0) {
        return <p className="text-dark-300 mt-2 font-medium">Tidak ada transaksi.</p>;
    }

    const handleOpenTransactionDetail = async (transactionNo) => {
        setTransactionNumber(null);
        setShowDetail(true);
        setIsLoadingDetail(true);
        try {
            const [detail, merchant] = await Promise.all([
                getTransactionDetail(merchantCode, transactionNo),
                getOutletInfo(merchantCode),
            ]);
            if (!detail.status || detail.data.length <= 0) throw new Error(detail.msg);
            if (!merchant.status) throw new Error(merchant.msg);
            setDetailData({
                ...detail.data,
                whatsapp_merchant: merchant?.data?.whatsapp_number,
            });
        } catch (error) {
            setShowDetail(false);
            AlertService.error(catchError(error));
        } finally {
            setIsLoadingDetail(false);
        }
    };

    useEffect(() => {
        if (transactionNumber) handleOpenTransactionDetail(transactionNumber);
    }, []);

    return (
        <div className="mt-1">
            <InfiniteScroll
                dataLength={transactionData.length}
                next={onFetchData}
                hasMore={hasMoreData}
                loader={<ScrollLoader />}
                endMessage={<></>}
            >
                {
                    transactionData.map(transaction => (
                        <TransactionItem
                            key={transaction.no}
                            data={transaction} 
                            onOpenDetail={() => handleOpenTransactionDetail(transaction.no)}
                        />
                    ))
                }
            </InfiniteScroll>
            <ModalDetailTransaction
                data={detailData}
                show={showDetail}
                isLoadingDetail={isLoadingDetail}
                merchantCode={merchantCode}
                onClose={() => setShowDetail(false)}
                onFetchDetail={handleOpenTransactionDetail}
            />
        </div>
    )
};

ListTransaction.propTypes = {
    transactionData: propTypes.arrayOf(propTypes.shape({})),
    hasMoreData: propTypes.bool,
    merchantCode: propTypes.string,
    onFetchData: propTypes.func,
};

ListTransaction.defaultProps = {
    transactionData: [],
    hasMoreData: false,
    merchantCode: "",
    onFetchData: () => {},
};

export default ListTransaction;

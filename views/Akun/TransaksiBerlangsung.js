import propTypes from "prop-types";

import Layout from "./components/layout/Layout";
import FilterTransaction from "./components/transaction/FilterTransaction";
import ListTransaction from "./components/transaction/ListTransaction";
import TransaksiSkeleton from "./skeleton/Transaksi";
import { ACCOUNT_MENU } from "constants/enum";
import { useFetchTransaction } from "./hooks/useFetchTransaction";

const TransaksiBerlangsung = ({ user, merchantCode }) => {
    const {
        dataIsLoaded,
        hasMoreData,
        isFiltered,
        transactionData,
        searchKey,
        setSearchKey,
        handleApplyFilter,
        handleResetFilter,
        handleFetchTransactionList,
    } = useFetchTransaction({ customerNo: user.customer_no, merchantCode });

    return (
        <Layout title="Transaksi Berlangsung" menu={ACCOUNT_MENU.PESANAN} mtChild="mt-1 md:mt-6">
            {
                dataIsLoaded ? (
                    <>
                        <FilterTransaction
                            isFiltered={isFiltered}
                            searchValue={searchKey}
                            onApplyFilter={handleApplyFilter}
                            onResetFilter={handleResetFilter}
                            onSearch={(e) => setSearchKey(e.target.value)}
                        />
                        <ListTransaction
                            transactionData={transactionData}
                            hasMoreData={hasMoreData}
                            merchantCode={merchantCode}
                            onFetchData={handleFetchTransactionList}
                        />
                    </>
                ) : <TransaksiSkeleton />
            }
        </Layout>
    )
};

TransaksiBerlangsung.propTypes = {
    merchantCode: propTypes.string.isRequired,
    user: propTypes.shape({}).isRequired,
};

export default TransaksiBerlangsung;

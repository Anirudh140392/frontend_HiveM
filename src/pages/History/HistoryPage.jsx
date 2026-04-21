import React from 'react';
import CommonContainer from '../../components/CommonLayout/CommonContainer';
import HistoryDashboard from '../../components/History/HistoryDashboard';

const HistoryPage = () => {
    return (
        <CommonContainer title="Action History">
            <HistoryDashboard />
        </CommonContainer>
    );
};

export default HistoryPage;

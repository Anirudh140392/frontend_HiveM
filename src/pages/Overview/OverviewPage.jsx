import React from 'react';
import CommonContainer from '../../components/CommonLayout/CommonContainer';
import OverviewDashboard from '../../components/Overview/OverviewDashboard';

const OverviewPage = () => {
    return (
        <CommonContainer title="Overview">
            <OverviewDashboard />
        </CommonContainer>
    );
};

export default OverviewPage;

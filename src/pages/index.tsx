import React from "react";

import Page from "templates/Page";
import ScheduleTable from "templates/ScheduleTable";
import Controls from "templates/Controls";

const HomePage = () => (
  <Page>
    <ScheduleTable />
    <Controls />
  </Page>
);

export default HomePage;

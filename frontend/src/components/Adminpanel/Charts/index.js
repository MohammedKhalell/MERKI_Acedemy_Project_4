import { AnalyticsDashboard } from "react-analytics-charts";
import { SessionsByDateChart, SessionsGeoChart,SessionsBySourceChart,SessionsByHourChart,PageViewsPerPathChart } from "react-analytics-charts";
import { useAnalyticsApi, } from "react-use-analytics-api";


const Charts=()=>{
    const { ready, gapi, authorized, error } = useAnalyticsApi();
return(
    
<AnalyticsDashboard
  authOptions={{ clientId: "260394999425-0vka8sggtmarkhanf033bsh18ot56vj5.apps.googleusercontent.com" }}
  renderCharts={(gapi, viewId) => {
    return (
      <div>
        <SessionsByDateChart
          gapi={gapi}
          viewId={viewId}
          showPageViews
          showUsers
        />
        <SessionsGeoChart 
          gapi={gapi} 
          viewId={viewId} 
          showPageViews 
        />
        ... More charts here ...
      </div>
    );
  }}
/>
    
)









}
export default Charts
import { useEffect, useState } from "react";
import { getUsageAnalytics } from "../services/api";

function Analytics(){

 const [data,setData] = useState([]);

 useEffect(() => {

   getUsageAnalytics().then(res=>{
     setData(res.data);
   });

 },[]);

 return(
  <div>
   <h2>Water Usage Analytics</h2>
   <pre>{JSON.stringify(data,null,2)}</pre>
  </div>
 );
}

export default Analytics;
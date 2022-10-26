import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const theme = localStorage.getItem('theme') ?? "sketchy";
    // parametre hata veriyor switch case denenemedi
   // import("bootswatch/dist/"+"vapor"+"/bootstrap.min.css");
   
    if (theme === "vapor") {
      import("bootswatch/dist/"+"vapor/bootstrap.min.css").then(() => setLoaded(true)).catch(x => console.log(x));
    }
    if (theme === "sketchy") {
      import("bootswatch/dist/"+"sketchy/bootstrap.min.css").then(() => setLoaded(true)).catch(x => console.log(x));
    } 
    if (theme === "darkly") {
      import("bootswatch/dist/"+"darkly/bootstrap.min.css").then(() => setLoaded(true)).catch(x => console.log(x));
    } 
    if (theme === "simplex") {
      import("bootswatch/dist/"+"simplex/bootstrap.min.css").then(() => setLoaded(true)).catch(x => console.log(x));
    } 
    if (theme === "quartz") {
      import("bootswatch/dist/"+"quartz/bootstrap.min.css").then(() => setLoaded(true)).catch(x => console.log(x));
    } 
  }, []);

  return (
    <>
      {loaded ?
        <>
          <Navbar></Navbar>
          <Component {...pageProps} />
        </> : <div className='waiting-panel'>Please wait loading</div>}
    </>)
}


export default MyApp

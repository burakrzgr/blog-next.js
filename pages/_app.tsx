import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/navbar'
import React from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const theme = localStorage.getItem('theme') ?? "sketchy";
    // parametre hata veriyor switch case denenemedi
    if (theme === "vapor") {
      import("bootswatch/dist/vapor/bootstrap.min.css");
    }
    if (theme === "sketchy") {
      import("bootswatch/dist/sketchy/bootstrap.min.css");
    } 
    if (theme === "darkly") {
      import("bootswatch/dist/darkly/bootstrap.min.css");
    } 
    if (theme === "vapor,sketchy") {
      import("bootswatch/dist/vapor/bootstrap.min.css");
      import("bootswatch/dist/sketchy/bootstrap.min.css");
    }
    setLoaded(true);
  }, [loaded]);

  return (
    <>
      {loaded ?
        <>
          <Navbar></Navbar>
          <Component {...pageProps} />
        </> : <p>Please wait loading</p>}
    </>)
}


export default MyApp

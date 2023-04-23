import React, { useContext } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Calendar from './components/Calendar/Calendar';
import { ViewportContext } from './appContext/ViewportContext';

function App() {
  const ViewportProvider = ({ children }: { children: React.ReactNode }) => {
    const mobOrDeskContext = useContext(ViewportContext);
    const [mobOrDesk, setMobOrDesk] = React.useState(mobOrDeskContext);
    // const [widthHeight, setWidthHeight] = React.useState({ width: window.innerWidth, height: window.innerHeight });
    const breakpoint = 620;


    React.useEffect(() => {
      const handleWindowResize = () => {
        // setWidthHeight({ width: window.innerWidth, height: window.innerHeight });
        setMobOrDesk((window.innerWidth > breakpoint) ? "Desktop" : "Mobile");
      };
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
      <ViewportContext.Provider value={mobOrDesk}>
        {children}
      </ViewportContext.Provider>);
  }

  return (
    <ViewportProvider>
      <div className="App">
        <Header />
        <Calendar />
        <Footer />
      </div>
    </ViewportProvider>
  )
}

export default App

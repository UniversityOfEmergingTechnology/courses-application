import { useState, useEffect } from "react";
import { filterData, apiUrl } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from './components/Cards'
import Spinner from './components/Spinner'

function App() {
  const [courses, setCourses] = useState({});
  const [category, setCategory] = useState(filterData[0].name);
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();
      console.log(output.data)
      setCourses(output.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(true)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar />
      </div>
      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ?  (<Cards courses = {courses} category={category} />) :  (<Spinner/>) 
          }
        </div>
      </div>
    </div>
  );
}

export default App;

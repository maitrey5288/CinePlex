import React, { useContext } from "react";

import { movieAPI } from "../../API/apis";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../../API/apiconnector";

import { ProgressContext } from "../../context/Context";
import AdminCard from "./AdminCard";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import MediaQuery, { useMediaQuery } from "react-responsive";
 
const AdminMovies = ({ theatre }) => {
  const small = useMediaQuery({ query: '(max-width: 385px)' })
  const { theatreId } = useParams();
  const { GETMOVIES_API ,GETLOCATIONS_API} = movieAPI;
  const navigate = useNavigate();

  const [theatres, setTheatres] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedtheatre, setSelectedTheatre] = useState("");
  const [selectedlocation, setSelectedLocation] = useState("");
  const [query, setQuery] = useState("");
 
  const [loading, setLoading] = useState(false);
  const [moviedata, setMoviedata] = useState([]);
  const { setProgress } = useContext(ProgressContext);
  const [filtered, setFiltered] = useState(
    moviedata?.filter((movie) =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    )
  );


  async function getMoviesData() {
    if (!theatre) {
      setProgress(10);
      setLoading(true);
      const res = await apiConnector("POST", GETMOVIES_API, {
        location: selectedlocation,
        theatre: selectedtheatre,
      });
      setProgress(30);
      setMoviedata(res.data.data);
      setProgress(50);
     
      setProgress(70);
      setLoading(false);
      setProgress(100);
    }
  }


  async function getMoviesDataForTheatre() {
    setProgress(10);
    setLoading(true);
    const res = await apiConnector("POST", GETMOVIES_API, {
      location: "",
      theatre: theatreId,
    });
    setProgress(30);
    setMoviedata(res.data.data);
    setProgress(50);
      
    setProgress(70);
    setLoading(false);
    setProgress(100);
  }

  function theatrechangehandler(e) {
    setSelectedTheatre(e.target.value);
  }
  function locationchangehandler(e) {
    setSelectedLocation(e.target.value);
  }

  async function getLocations() {
    setLoading(true);
    const res = await apiConnector("POST", GETLOCATIONS_API, {});
 
    setLocations(res.data.data);

    setLoading(false);
  }

  function queryChanger(e) {
    setQuery(e.target.value);

 
  }
  useEffect(() => {
    setFiltered(
      moviedata?.filter((movie) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, moviedata]);

  useEffect(() => {
    locations.forEach((l) => {
      if (l._id == selectedlocation) {
        if (l.theatres) {
          setTheatres(l.theatres);
        } else {
          setTheatres([]);
        }
      }
    });
  }, [selectedlocation]);

  useEffect(() => {
    getMoviesData();
  }, [selectedlocation, selectedtheatre]);

  useEffect(() => {
    getLocations();
    if (theatre) getMoviesDataForTheatre();
    return () => {
      setMoviedata([]);
    };
  }, []);

  return loading ? (
    <>Loading</>
  ) : (
    <div className="relative">
      <div className="bg-bg-2 text-white  w-full  pt-11   px-1">
        <div className=" text-3xl text-white w-full flex flex-col items-center my-2">
          <p className="text-center w-max border-b-4 border-textcolor">Movies</p>
        
        </div>
        <div className=" flex flex-wrap gap-2 justify-evenly mt-4">
          <div className="relative">
            <input
              onChange={queryChanger}
              value={query}
              className="sm:w-44 w-full h-8 bg-neutral-500/25 border-textcolor border rounded-xl p-2"
              placeholder="Search"
            ></input>
            <div className="absolute top-0 right-0 h-8 flex items-center justify-center w-6 bg-textcolor rounded-r-xl">
           <IoSearch />

            </div>
         
          </div>
          <MediaQuery minWidth={350}>
          <div >

            <button
              onClick={() => navigate("/admin/addmovie")}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-sm"
            >
             <IoMdAddCircleOutline /> <p> Add Movie</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={349}>
          <div >

            <button
              onClick={() => navigate("/admin/addmovie")}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-[5vw]"
            >
             <IoMdAddCircleOutline /> <p> Add Movie</p>
            </button>
         
          </div>
          </MediaQuery>
        </div>
        
        <div className="sm:w-[70%] p-3 mx-auto flex   md:text-xl flex-wrap justify-evenly">
          {!theatre && (
            
              <div className="flex gap-3 flex-wrap justify-evenly  items-center w-full">
                <p className="text-textcolor md:text-xl w-max">Select Location</p>
                <select
                  className={"bg-bgcarousalcontent   p-2 sm:text-base  rounded-md text-white" +( small&& " text-[4vw]")}
                  onChange={locationchangehandler}
                  value={selectedlocation}
                >
                  <option value="">All</option>
                  
                  {locations?.map((location, index) => {
                    return (
                      <option value={location._id} key={index}>
                        {location.name}
                      </option>
                    );
                  })}
                </select>
              </div>
             
          )}

           
            {!theatre && selectedlocation != "" && (
               
                
                  <div className="flex gap-3 flex-wrap justify-evenly items-center">
                    <p className="text-textcolor w-max md:text-xl">Select Theatre</p>
                    <select
                      className={"bg-bgcarousalcontent   p-2 sm:text-base  rounded-md text-white" +( small&& " text-[4vw]")}
                      onChange={theatrechangehandler}
                      defaultValue={""}
                      value={selectedtheatre}
                    >
                      <option value="">All</option>
                      {theatres?.map((theatre, index) => {
                        return (
                          <option value={theatre._id} key={index}>
                            {theatre.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                
              
            )} 
           
        </div>

      </div>

      <div className=" w-full flex-wrap bg-bg-1 py-3 justify-center mt-9 flex gap-4">
        {filtered.length > 0 ? (
          filtered.map((movie) => {
            return <AdminCard key={movie._id} movie={movie} />;
          })
        ) : (
          <div className="text-textcolor text-5xl">No Movie Found</div>
        )}
      </div>
 
    </div>
  );
};

export default AdminMovies;

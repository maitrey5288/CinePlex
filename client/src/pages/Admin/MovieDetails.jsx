import React, { useContext, useEffect, useState } from "react";
 
import { apiConnector } from "../../API/apiconnector";
import { movieAPI } from "../../API/apis";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAccessTime } from "react-icons/md";
import MediaQuery,{ useMediaQuery } from "react-responsive";
import "react-multi-carousel/lib/styles.css";
 
import AddShow from "./AddShow";
import ShowList from "../../components/ShowList";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ProgressContext } from "../../context/Context";
const MovieDetails = () => {
  const { movieId } = useParams();
  const {setProgress} = useContext(ProgressContext)
  const[addShow,setAddShow] = useState(false)
  const { GETMOVIEDATA_API, GETSHOWDATA_API } = movieAPI;
  const [loading, setLoading] = useState(false);
  
  const [movie, setMovie] = useState();
  
  const [twoDshows, settwoDShows] = useState({});
  const [threeDshows, setThreeDShows] = useState({});
  const [selectedtheatre, setTheatre] = useState("");

  async function getMovieData() {
    try {
      setProgress(10)
      setLoading(true);
      const res = await apiConnector("POST", GETMOVIEDATA_API, {
        movieId: movieId,
      });
      setProgress(50)
      setMovie(res.data.data);
      setProgress(70)
       
      setLoading(false);
      setProgress(100)
    } catch (e) {
      setProgress(100)
      toast.error(e.message);
    }
  }


  useEffect(() => {
    getMovieData();
  }, []);

 
 
  useEffect(() => {
    setTheatre('')
    settwoDShows({})
    setThreeDShows({})
  }, [addShow]);

  return loading ? (
    <></>
  ) : (
    <div
      className={`min-h-[100vh] bg-bg-1 w-[100vw] flex flex-wrap flex-col items-center text-white`}
    >
      <div className="sm:w-[70%] w-[90%]  mt-24  ">
        <div>
          <div className="flex flex-wrap justify-evenlyus gap-7">

            <img
              src={movie?.image}
              className="w-52 h-80 rounded-md  shadow-2xl"
            />
            <div className="py-10">
              <div className="sm:text-5xl text-[8vw] font-semibold  ">
                <p>{movie?.name}</p>
              </div>

              <div className=" text-white/80 mt-9 flex flex-col gap-1">
                <div className="flex gap-3">
                  <div className="flex gap-2 items-center">
                    <MdLanguage className="text-textcolor" />
                    <p>{movie?.language}</p>
                  </div>
                  
                </div>
                <div className="flex gap-3 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <CiCalendarDate className="text-textcolor" />
                    <p>{new Date(movie?.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 items-center  flex-wrap">
                    <MdOutlineAccessTime className="text-textcolor" />
                    <p className="w-max">{movie?.duration}</p>
                  </div>
                </div>
              </div>
              <div className="text-sm mt-9  text-white/80">
                <div className="flex gap-2">
                  <p className="text-textcolor">Genre : </p>
                  <p> {movie?.genre}</p>
                </div>
                <div className="flex  gap-2">
                  <p className="text-textcolor">Directeed By : </p>
                  <p>{movie?.directors}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-textcolor">Top Cast : </p>
                  <p>{movie?.topcast}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col mt-5 sm:ml-3 gap-2">
            <p className="text-textcolor text-[6vw] sm:text-3xl font-semibold">Description</p>
            <div className="w-full  text-white/80">{movie?.description}</div>
          </div>
        </div>

        <div className="mt-9 sm:ml-3 flex justify-between w-[70%] items-center flex-wrap">
          <p className="text-textcolor text-[6vw] sm:text-3xl font-semibold">Showtimes</p>
          
        <div>
        <MediaQuery minWidth={350}>
          <div >

            <button
              onClick={()=>setAddShow(!addShow)}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-sm"
            >
             <IoMdAddCircleOutline /> <p> Add Show</p>
            </button>
         
          </div>
          </MediaQuery>
          <MediaQuery maxWidth={349}>
          <div >

            <button
              onClick={()=>setAddShow(!addShow)}
              className="px-3  py-1 flex   items-center gap-1 rounded-lg bg-textcolor hover:shadow-lg hover:bg-textcolor/95 hover:shadow-black text-white font-semibold text-[4vw]"
            >
             <IoMdAddCircleOutline /> <p> Add Show</p>
            </button>
         
          </div>
          </MediaQuery>
        </div>
        </div>
        {!addShow  &&      <ShowList twoDshows={twoDshows} setAddShow={setAddShow} selectedtheatre={selectedtheatre} setTheatre={setTheatre}  settwoDShows={settwoDShows} setThreeDShows={setThreeDShows} threeDshows={threeDshows}/>
        }
        
        { addShow && <AddShow movie={movie} setAddShow={setAddShow}/> } 
      </div>
    </div>
  );
};

export default MovieDetails;

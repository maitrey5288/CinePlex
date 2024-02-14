import React, { useEffect, useState } from 'react'
import { movieAPI } from "../API/apis";
import { useParams } from 'react-router-dom';
import { apiConnector } from '../API/apiconnector';
import toast from 'react-hot-toast';
import CarousalCompo from "../components/CarousalCompo";
const ShowList = ({twoDshows,  selectedtheatre, setTheatre , settwoDShows ,setThreeDShows ,threeDshows}) => {
    const { movieId } = useParams();
    const { GETMOVIEDATA_API, GETSHOWDATA_API } = movieAPI;
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState();
    const [showLoading, setShowLoading] = useState(false);
   
  function changehandler(e) {
    setTheatre(e.target.value);
    getShowData(e.target.value);
  }
  async function getShowData(theatreId) {
    try {
      setShowLoading(true);
      const res = await apiConnector("POST", GETSHOWDATA_API, {
        theatreId: theatreId,movieId:movieId,showtype : '2D'
      });
      let showsData = {};
      res.data.data.forEach((show) => {
        if (showsData.hasOwnProperty(show.date)) {
          showsData[show.date].push(show);
        } else {
          showsData[show.date] = [show];
        }
      });
      settwoDShows(showsData);
 
      const res1 = await apiConnector("POST", GETSHOWDATA_API, {
        theatreId: theatreId,movieId:movieId,showtype : '3D'
      });
      let showsData1 = {};
      res1.data.data.forEach((show) => {
        if (showsData1.hasOwnProperty(show.date)) {
          showsData1[show.date].push(show);
        } else {
          showsData1[show.date] = [show];
        }
      });
      setThreeDShows(showsData1);

      
      setShowLoading(false);
    } catch (e) {
      toast.error(e.message);
    }
  }

    async function getMovieData() {
        try {
          setLoading(true);
          const res = await apiConnector("POST", GETMOVIEDATA_API, {
            movieId: movieId,
          });
          setMovie(res.data.data);
         
          setLoading(false);
        } catch (e) {
          toast.error(e.message);
        }
      }
    useEffect(() => {
        getMovieData();
      }, []);


  return (
    <div>
    <div className="flex justify-between w-[70%]">
<select
        className="bg-bgcarousalcontent my-3 p-2 rounded-md"
          onChange={changehandler}
          defaultValue={""}
          value={selectedtheatre}
        >
          <option value="" disabled>
            Choose a theatre
          </option>
          {movie?.theatres.map((theatre, index) => {
            return (
              <option value={theatre._id} key={index}>
                {theatre.name}
              </option>
            );
          })}
        </select> 




        </div>  
         <div>
  <div>
          <p className="w-[70%] relative z-[1] text-center bg-bgcarousalheader customShadow h-8">
            2D
          </p>

          
            <div className="w-[70%] relative z-0   bg-bgcarousalcontent rounded-b-xl py-2">
              {showLoading == true ? (
                <>Loading</>
              ) : (
                <CarousalCompo shows={twoDshows}  />
              )}
            </div>

        </div> 
        <div>
          <p className="w-[70%] relative z-[1] text-center bg-bgcarousalheader customShadow h-8">
            3D
          </p>

          
            <div className="w-[70%] relative z-0   bg-bgcarousalcontent rounded-b-xl py-2">
              {showLoading == true ? (
                <>Loading</>
              ) : (
                <CarousalCompo shows={threeDshows} />
              )}
            </div>

        </div>
        </div>
        </div>
  )
}

export default ShowList
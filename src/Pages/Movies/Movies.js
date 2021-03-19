import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setpage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setnumOfPages] = useState();
  const [selectedGenres,setselectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL=useGenre(selectedGenres);

  
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setnumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
  }, [genreforURL, page]);;

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setselectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setpage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movies"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setpage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;

import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../utils/api";
import MovieTabs from "./MovieTabs";
import MoviesWillWatch from "./MoviesWillWatch";
import MoviePages from "./MoviePages";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            moviesWillWatch: [],
            sort_by: "popularity.desc",
            page: 1,
            totalPages: 0
        };
    }

    getMovies = () => {
        fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.setState({movies: data.results, totalPages: data.total_pages});
                console.log("render getMovies", data);
            })
    };

    componentDidMount() {
        this.getMovies();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.sort_by !== this.state.sort_by ||
        prevState.page !== this.state.page) {
            this.getMovies();
        }
    }

    deleteMovie = movie => {
        console.log(movie.id);
        const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
        console.log(updateMovies);

        // this.state.movies = updateMovies;
        this.setState({
            movies: updateMovies
        });
    };

    addMovieToWillWatch = movie => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch];
        updateMoviesWillWatch.push(movie);

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    deleteMovieFromWillWatch = movie => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            item => item.id !== movie.id
        );

        this.setState({
            moviesWillWatch: updateMoviesWillWatch
        });
    };

    updateSortBy = value => {
        this.setState({sort_by: value});
    };

    changePage = (num) => {
      const nextPage = this.state.page + num;

            this.setState({page: nextPage});
            // this.getMovies();
    };

    render() {
        console.log("render", this.state.movies);
        console.log("page: ", this.state.page);
        // console.log("total pages: ", this.state.totalPages);
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-9">
                        <div className="row mb-4">
                            <div className="col-12">
                                <MovieTabs
                                    sort_by={this.state.sort_by}
                                    updateSortBy={this.updateSortBy}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <MoviePages
                                    changePage={this.changePage}
                                    page={this.state.page}
                                    totalPages={this.state.totalPages}
                                    />
                            </div>
                        </div>
                        <div className="row">
                            {this.state.movies ? this.state.movies.map(movie => {
                                return (
                                    <div className="col-6 mb-4" key={movie.id}>
                                        <MovieItem
                                            data={movie}
                                            deleteMovie={this.deleteMovie}
                                            addMovieToWillWatch={this.addMovieToWillWatch}
                                            deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                                        />
                                    </div>
                                );
                            }) : "Is Loading..."}
                        </div>
                        <div className="row mb-4">
                            <div className="col-12">
                                <MoviePages
                                    changePage={this.changePage}
                                    page={this.state.page}
                                    totalPages={this.state.totalPages}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
                        <MoviesWillWatch moviesWillWatch={this.state.moviesWillWatch}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

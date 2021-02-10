let resultDiv = document.getElementById("result");
let btn = document.getElementById("btnsearch");
let searchVal = document.getElementById("searchval");

    if (btn) {
    // let strval = searchVal.value.trim();
    btn.addEventListener("click", (e) => {
        let str = searchVal.value.trim();
        console.log(str.length);
        if(str.length == 0){
            e.preventDefault;
            
        }else{
            getMovies();
        }
        });
    }

    const getMovies = () => {
        // console.log(searchVal.value);
    fetch('http://www.omdbapi.com/?apikey=277b35a6&s='+searchVal.value.trim()).then((result) => {
        let data = result.json();
        return data;
    }).then((data) => {
        console.log(data);
        return data;
    }).then((data) => {
        // console.log(data.Search[0].Title);
        let searchArr = data.Search;
        console.log(searchArr)
            let output = '';
            for (let i = 0; i < searchArr.length; i++) {
                    // resultDiv.innerHTML += `<h2>${searchArr[i].Title}</h2>`;
                    //console.log(searchArr[i].Title);
                    // console.log(searchArr[i].Poster);
                    // console.log(searchArr[i].imdbID);
            
                        output += `
                    <div class="col-md-3">
                        <div class="movie-card mt-3 mb-3">
                            <img src="${searchArr[i].Poster.split("N/A").join("image/film-poster-placeholder.png")}" alt="">
                            <div class="movie-card-title">
                                <h3>${searchArr[i].Title}</h3>
                                <a href="movieinfo.html?id=${searchArr[i].imdbID}" target="_blank" class="btn btn-danger">view info</a>
                            </div>
                        </div>
                    </div>`;
            }
            resultDiv.innerHTML = output;
    });
    }

    // function get movie id
    const getMovieId = () => {
        let pageUrl = window.location.href;
        let getUrl = new URL(pageUrl);
        let getId  = getUrl.searchParams.get("id");
        // console.log(pageUrl);
        // console.log(getId);
        return getId;
    }
    // function get movie
    const getMovie = () => {
        let ID = getMovieId();
        let movieDiv = document.getElementById("movieinforesult");
        fetch('http://www.omdbapi.com/?apikey=277b35a6&i='+ID).then((movie) => {
            let dataMovie = movie.json();
            return dataMovie;
        }).then((dataMovie) => {
            console.log(dataMovie);
            return dataMovie;
        }).then((dataMovie) => {
            let actors = dataMovie.Actors.split(",").join(" | ");
            let genre = dataMovie.Genre.split(",").join(" | ");

            movieDiv.innerHTML = `
            <div class="col-md-6">
                <div class="movie-info">
                    <h2>${dataMovie.Title}</h2>
                    <p>${dataMovie.Plot}</p>
                    <div class="mb-2 tb-movie"><span class="key">  Actors  :</span> ${actors}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Director  :</span> ${dataMovie.Director}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Genre  :</span> ${genre}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Year  :</span> ${dataMovie.Year}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Country  :</span> ${dataMovie.Country}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Awards  :</span> ${dataMovie.Awards}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Box Office  :</span> ${dataMovie.BoxOffice}</div>
                    <div class="mb-2 tb-movie"><span class="key">  Imdb Rating  :</span> ${dataMovie.imdbRating}</div>
                    <div class="mb-3 tb-movie"><span class="key">  Imdb Votes  :</span> ${dataMovie.imdbVotes}</div>

                    <div class="movie-btn">
                        <button class="btn btn-danger"><i class="fas fa-play"></i> Watch Naw</button>
                        <button class="btn btn-down"><i class="fas fa-download"></i> Download</button>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="img-cont">
                    <img src="${dataMovie.Poster}" alt="">
                </div>
            </div>`;
            document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)), url('${dataMovie.Poster}')`;
        });
    }



const selectors = {
    searchBar : document.querySelector('#search_bar'),
    searchButton : document.querySelector('.search_btn'),
    artistContainer : document.querySelector('.artist_container')
}

selectors.searchBar.addEventListener('keydown', getUserSearch)
selectors.searchButton.addEventListener('click', searchItunes)

function getUserSearch(e){
    const userSearchValue = e.target.value
    console.log(userSearchValue)
    return userSearchValue
}

selectors.searchBar.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      searchItunes();
    }
  });

function searchItunes(){
    const searchedWord = selectors.searchBar.value
    if(searchedWord === ''){
        alert('No Empty Searches')
    }else{
        const itunesUrl = `https://itunes.apple.com/search?term=${searchedWord}7D&media=music&entity=album&attribute=artistTerm&limit=500`

        fetch(itunesUrl)
        .then(res => res.json())
        .then(resp=>{
            iterateResults(resp)
        })
    }
}

function iterateResults(resultsArr){
    const iTunesSearchValue = resultsArr.results.map(item=>{
        console.log(item)
        return `
        <div class=userResult>
            <p> ${item.artistName} </p>
            <img src = ${item.artworkUrl60} />
       
            <p> ${item.trackCount}
        </div>`
    })
    showData(iTunesSearchValue)
}

function showData(eachArtist){
    selectors.artistContainer.innerHTML = eachArtist;
}




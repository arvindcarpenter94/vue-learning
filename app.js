const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = "uvTGcqXKO56EvalbtWI17WWleF5KdNWg";
const SECTIONS = "home, arts, automobiles, books, business, fashion, food, health, insider, magazine, movies, national, nyregion, obituaries, opinion, politics, realestate, science, sports, sundayreview, technology, theater, tmagazine, travel, upshot, world"; // From NYTimes


function buildUrl (url) {
    return NYTBaseUrl + url + ".json?api-key=" + ApiKey
  }

new Vue({
    el : '#app',
    data : {
        results : [],
        sections: SECTIONS.split(', '), // create an array of the sections
        section: 'home', // set default section to 'home'
    },
    methods : {
        getPosts(section){
            let url = buildUrl(section);
            axios.get(url)
            .then(response => {this.results = response.data.results;})
            .catch(error => {console.log(error);});
        }
    },
    mounted() {
        this.getPosts(this.section);
      },
      computed: {
        processedPosts() {
          let posts = this.results;
          // Add image_url attribute
          posts.map(post => {
            let imgObj = post.multimedia.find(media => media.format === "superJumbo");
            post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
          });
    
          // Put Array into Chunks
          let i, j, chunkedArray = [], chunk = 4;
          for (i=0, j=0; i < posts.length; i += chunk, j++) {
            chunkedArray[j] = posts.slice(i,i+chunk);
          }
          return chunkedArray;
        }
      }
});
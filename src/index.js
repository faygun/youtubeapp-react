import _ from 'lodash';
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyBL3iOil284EqjoFnaYFlG1o_tewS7A6Q8';

class App extends Component{
    constructor(props){
        super(props);

        this.state={
            videos : [],
            selectedVideo:null
        };
        
        this.videoSearch('germany');
    }

    videoSearch(term){
        //Callback deki property ismi ile state deki aynı ise bu şekilde yazılabilir...
        YTSearch({key:API_KEY, term:term},(videos)=>{
            this.setState({
                videos : videos,
                selectedVideo : videos[0]
            });
        });
    }
    
    render(){
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 300);
        return(
            <div>
                <SearchBar onTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('.container'));
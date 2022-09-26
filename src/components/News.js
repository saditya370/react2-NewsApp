import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {



  constructor(){
    super()

    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=951b2c43851b412e802bbf25d1cde73f&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState ({articles: parsedData.articles,totalResults: parsedData.totalResults})
  }

      handlePrevClick =async() =>{
        

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=951b2c43851b412e802bbf25d1cde73f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
    

        this.setState({
          page: this.state.page - 1,
          articles: parsedData.articles,
          loading: false
        })


      }

      handleNextClick = async() => {
      

        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

        }
        else {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=951b2c43851b412e802bbf25d1cde73f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();

      

        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
        })
      }
      }



  render() {
    return (
       
       <div className='container my-3'>
        <h1 className='text-center'>Newsdaily Top Headlines</h1>
         {this.state.loading && <Spinner/>}
          <div className="row" >
        {!this.state.loading && this.state.articles.map((element)=>{
           
              return  <div className="col-md-4"  key={element.url}>

                  <NewsItem title= {element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,100):''} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
               
     
          })}
          </div>

          <div className="container d-flex justify-content-between">
              <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

              </div>


      </div>
    

    )
  } 
}

export default News
import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=apple&from=2022-09-09&to=2022-09-09&sortBy=popularity&apiKey=d1f980ec999e4a198dacafab98b35012&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/everything?q=apple&from=2022-09-09&to=2022-09-09&sortBy=popularity&apiKey=d1f980ec999e4a198dacafab98b35012&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles });
      this.setState({
        page: this.state.page + 1,
      });
    }
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/everything?q=apple&from=2022-09-09&to=2022-09-09&sortBy=popularity&apiKey=d1f980ec999e4a198dacafab98b35012&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page - 1,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Top Headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="conatiner d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            rel="noreferrer"
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            &larr; Prev
          </button>
          <button
            rel="noreferrer"
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

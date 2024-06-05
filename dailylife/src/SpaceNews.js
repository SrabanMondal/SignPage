import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SpaceNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(loading){
      const fetchSpaceNews = async () => {
        try {
          const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
              q: 'space', // Search query for space news
              sortBy: 'publishedAt', // Sort articles by published date
              apiKey: 'c29a483cb7354925af54cab78bca75a2', // Replace with your NewsAPI key
            },
          });
          //console.log(response.data);
          setArticles(response.data.articles);
          setLoading(false);
        } catch (error) {
          setError('Failed to fetch space news.');
          setLoading(false);
        }
      };
      
      fetchSpaceNews();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: true,
    arrows:false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return (
    <div  className=' h-fit w-screen sm:w-108 bg-purple-400 border-2 rounded border-purple-700'>
      <h2 className='text-2xl font-bold text-center bg-purple-500'>Global News</h2>
      <Slider {...settings}>
            {
                articles &&
                articles.map((news,index) => (
                    <a key={index} href={news.url} className='hover:bg-slate-500 h-80 flex flex-col'>
                        <div className='h-5/6'>
                            <h1 className=' font-bold text-xl m-1 md:m-3 md:text-xl h-2/6'>{news.title} </h1>
                        <img src={news.urlToImage} className='h-3/6 m-1 md:m-3 border-2 border-black'/>
                        <p className='m-1 font-semibold md:m-3 text-xs h-1/6'>{news.description}</p>
                        </div>
                    </a>
                ))

            }
        </Slider>
    </div>
  );
};

export default SpaceNews;
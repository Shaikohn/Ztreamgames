import { useEffect, useReducer, useRef } from 'react'
import { GreenLike, RedDisLike, RemoveComment, Star } from "../../icons/Icons";
import axios from "axios"
import "./index.css"
import VanillaTilt from 'vanilla-tilt';
import Particle from '../Particle/Particle';
import Rating from "../../components/Rating/Rating";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../redux/actions/videogamesActions';

export default function Details({ details }) {

    const dispatch = useDispatch();
    const { id } = useParams();
    const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
    
    useEffect(() => {
        dispatch(getById(id))
    }, [reducerValue, dispatch, id])

    function Tilt(props) {
        const { options, ...rest } = props;
        const tilt = useRef(null);
      
        useEffect(() => {
          VanillaTilt.init(tilt.current, options);
        }, [options]);

        return <div ref={tilt} {...rest} />;
    }

    async function handleClick(reviewId) {
        try {
          await axios.delete(`https://ztreamgames-qjsa-dev.fl0.io/reviews/${reviewId}`);
          forceUpdate();
        } catch (error) {
          console.log(error);
        }
      }
    

    return (
        <>
        <div className="container-02">
            {/* <Particle /> */}
		<h2>{details.name}</h2>
        <div className='reviewModal'>
        < Rating />
        </div>
         <Tilt> 
		<div className="glassmorphic-card">
			<div className="imgBox">
            <img alt={details?.name} className="image" src={details?.background_image} />
			</div>
			<div className="contentBox">
				<h3>Price: {details.price}$</h3>
				<div>
                    <p className="html"dangerouslySetInnerHTML={{ __html:details?.description}}/>
                </div>
                {details?.genres.length && details.genres.map((el, i) => {
                    return(
                    <a key={i}><span>{el}</span></a>)
                })}
                    <div className='likesContainer'>
                    <GreenLike /> <p> {details?.likes} </p> <RedDisLike /> <p>{details?.dislikes}</p> 
                    </div>
			</div>
		</div>
        </Tilt> 
		<span><p>{details?.platforms.length && details.platforms.join(', ') }</p></span>
    {details.comments?.length === 0 ? <h1>No comments</h1> : <h1>Comments</h1>} 
          {details.comments?.map((c) => {
            return (
              <div className='commentsContainer' key={c._id}>
                <button className='removeComment' onClick={() => handleClick(c._id)}><RemoveComment /> </button>
                <p className='commentsText'>{c.comments} | {c.author} </p>
              </div>
            );
          })}
	</div>
    </>
   
    )
}
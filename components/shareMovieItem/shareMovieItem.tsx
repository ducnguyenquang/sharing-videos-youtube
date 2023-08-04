import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';

const ShareMovieItem = ({ item }) => {
  
  
  return <>
    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${item.id}`} frameborder="0" allowfullscreen></iframe>
    <div className="information">
      <h1>{item.title}</h1>
      <div className="sharedBy">{item.title}</div>
      <div className="vote">
        <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
      </div>
      <div className="description">
        <div>Description:</div>
        {item.description}
      </div>
    </div>
  </>
}

export default ShareMovieItem;

import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = ({category})=>{

  const {imageUrl,title,route} = category;
  const navigate = useNavigate();
  const onClickHandler = ()=>{
    navigate(`/${route}`)
  }
  return(
  <div className="directory-item-container" >
    <div
        className='background-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        onClick={onClickHandler}
      />
      <div className="body">
      <h2>{title.toUpperCase()}</h2>
    <p>SHOP NOW</p>
      </div>
    
  </div>
  )
}

export default DirectoryItem;
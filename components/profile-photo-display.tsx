import styles from '../styles/Home.module.css'

const imgList = {

    one : {
        backgroundImage: "url('https://via.placeholder.com/400x200')"
  },    
  two : {
    backgroundImage: "url('https://via.placeholder.com/400x200')"
    }
} 

export default function ProfilePhotoDisplay ({link}:{link:string}) {
  return (
    <div className='d-flex justify-content-center'>
      <div className={styles.useImg +' w-75'} style={{aspectRatio:'1/1',...imgList.one}}>      
      </div>
    </div>
  );
}

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
    <div className={styles.useImg +' w-100 m-4'} style={{aspectRatio:'1/1',...imgList.one}}>      
    </div>
  );
}

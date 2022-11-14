import styles from '../styles/Home.module.css'
import { Gender } from '../types/blog';


const nnoPhoto = [{
    backgroundImage: "url('/img/noprofile-female.jpg')"
},
{
    backgroundImage: "url('/img/noprofile-male.png')"
}
];


type StringMap = {
    [key: string]: any;
  };
   
const noPhoto: StringMap = {
    "Male" : {backgroundImage: "url('/img/noprofile-male.png')"},
    "Female" : {backgroundImage: "url('/img/noprofile-female.jpg')"},
    "Non" :{backgroundImage: "url('/img/noprofile-male.png')"}
};

export default function ProfilePhotoDisplay({ link,gender }: { link: string,gender:Gender }) {
    return (
        <div className='d-flex justify-content-center'>
            {link.length > 0?
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', backgroundImage:`url('/img/pp/${link}')`}}></div>:
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', ...noPhoto[gender.toString()] }}></div>
            }
        </div>
    );
}


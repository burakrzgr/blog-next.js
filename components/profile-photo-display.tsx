import styles from '../styles/Home.module.css'

const noPhoto = [{
    backgroundImage: "url('/img/noprofile-female.jpg')"
},
{
    backgroundImage: "url('/img/noprofile-male.png')"
}
]

export default function ProfilePhotoDisplay({ link }: { link: string }) {
    return (
        <div className='d-flex justify-content-center'>
            {link.length > 0?
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', backgroundImage:`url('/img/pp/${link}')`}}></div>:
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', ...noPhoto[Math.floor(Math.random()*2)] }}></div>
            }
        </div>
    );
}


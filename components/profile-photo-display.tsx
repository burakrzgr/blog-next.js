import styles from '../styles/Home.module.css'

const noPhoto = {
    backgroundImage: "url('/img/no-profile-photo.png')"
}

export default function ProfilePhotoDisplay({ link }: { link?: string }) {
    return (
        <div className='d-flex justify-content-center'>
            {link?
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', backgroundImage:`/img/pp/${link}`}}></div>:
                <div className={styles.useImg + ' w-75'} style={{ aspectRatio: '1/1', ...noPhoto }}></div>
            }
        </div>
    );
}

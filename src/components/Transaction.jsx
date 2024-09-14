import styles from './Transaction.module.css'
import { IoMdCloseCircleOutline } from "react-icons/io";

import { MdOutlineModeEdit } from "react-icons/md";


export default function Transaction({ details, handleDelete, handleEdit }) {

    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardIcon}>
                    {details.category == 'food'}
                    {details.category == 'entertainment'}
                    {details.category == 'travel' }
                </div>
                <div className={styles.cardInfo}>
                    <h5>{details.title}</h5>
                    <p>{details.date}</p>
                </div>
            </div>

            <div className={styles.cardInner}>
                <p className={styles.cardPrice}>{`₹${details.price}`}</p>
                <div className={styles.cardButtonWrapper}>
                    <button className={styles.cardDelete} onClick={handleDelete}>
                        <IoMdCloseCircleOutline />
                    </button>
                    <button className={styles.cardEdit} onClick={handleEdit}>
                        <MdOutlineModeEdit />
                    </button>
                </div>
            </div>

        </div>
    )
}
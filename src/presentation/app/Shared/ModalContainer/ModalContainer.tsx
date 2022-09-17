import styles from "./ModalContainer.module.scss";

interface ModalContainerProps {
  handleClose: () => void;
  show: boolean;
  children: React.ReactNode;
}

export const ModalContainer = (props: ModalContainerProps) => {
  const { handleClose, show, children } = props;

  return (
    <>
      {show && (
        <div className={`${styles.modal_container} fadeIn`}>
          <section className={styles.modal_card}>
            <div className={styles.modal_card__header}>
              {/* close icon fontawesome */}
              <button
                className={`${styles.close_button} link`}
                onClick={handleClose}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className={styles.modal_card__body}>{children}</div>
          </section>
        </div>
      )}
    </>
  );
};

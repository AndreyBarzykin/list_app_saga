import React, { useRef } from "react";

// import { ListsActionCreators } from "../../store/reducers/userData/action-creators";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.scss";
import { clearCurrentList } from "../../redux/sagas/userData";

const CustomModal = ({
  title,
  children,
  actionFooterBar,
  actionHeaderBar,
  withCloseButton,
  showModal,
  onClose,
}) => {
  const modalRef = useRef();

  const closeModal = () => {
    onClose();
  };
  return (
    showModal && (
      <div
        className={styles.ModalBackground}
        ref={modalRef}
        onClick={(e) => modalRef.current === e.target && closeModal()}
      >
        <div className={styles.ModalWrapper}>
          {/* <div className={styles.ModalContent}> */}
          <div className={styles.ModalHeader}>
            <h2 className={styles.ModalTitle}>{title || "Title"}</h2>
            <div className={styles.ModalHeaderIcons}>
              {actionHeaderBar && actionHeaderBar}
              {withCloseButton && (
                <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
              )}
            </div>
          </div>
          <div className={styles.ModalBody}>{children}</div>
          <div className={styles.ModalFooter}>
            {!!actionFooterBar && actionFooterBar}
          </div>
          {/* </div> */}
        </div>
      </div>
    )
  );
};

export default CustomModal;

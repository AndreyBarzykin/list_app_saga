import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faEdit,
  faEllipsisV,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CardItem from "./CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListRequest,
  setCurrentList,
  updateCurrentListRequest,
} from "../../redux/sagas/userData";
import { toggleEditModal } from "../../redux/sagas/modals";
import Loader from "../Loader/Loader";

const Card = ({ list }) => {
  const dispatch = useDispatch();
  const { lists, loadingUpdate } = useSelector(
    (state) => state.userDataReducer
  );
  const [isCompleteItems, setIsCompleteItems] = useState([]);
  const [, setToggleID] = useState("");
  const [toggleRotate, setToggleRotate] = useState(false);

  const [targetCheckboxID, setTargetCheckboxID] = useState("");

  // Toggle cards listItems (chevron cklick)
  const handleToggle = (id) => {
    setToggleID(id);
    setToggleRotate(!toggleRotate);
  };

  const deleteCardHandler = (id) => {
    dispatch(deleteListRequest(id));
  };

  const handleCheckbox = (e, list) => {
    if (isCompleteItems.includes(e.target.value)) {
      setIsCompleteItems(isCompleteItems.filter((i) => i !== e.target.value));
    } else {
      setIsCompleteItems([...isCompleteItems, e.target.value]);
    }
    // console.log(e.target.id);
    setTargetCheckboxID(e.target.id);
    const targetListItem = list.listItem.map((i) => {
      if (e.target.value === i.id && !isCompleteItems.includes(i.id)) {
        return {
          ...i,
          isComplete: true,
        };
      } else if (e.target.value === i.id && isCompleteItems.includes(i.id)) {
        return {
          ...i,
          isComplete: false,
        };
      }
      return i;
    });
    console.log(list);
    const updListIsComplete = {
      ...list,
      id: list._id,
      listItem: targetListItem,
    };

    dispatch(updateCurrentListRequest(updListIsComplete));
  };

  // Set complete list/card items
  useEffect(() => {
    const arr = lists.reduce((acc, list) => [...acc, ...list.listItem], []);

    setIsCompleteItems(
      arr.reduce((acc, item) => {
        if (item.isComplete) {
          acc = [...acc, item.id];
        }
        return acc;
      }, [])
    );
  }, [lists]);

  const onEdit = (list) => {
    dispatch(setCurrentList(list));
    dispatch(toggleEditModal());
  };

  console.log(targetCheckboxID);
  return (
    <div className={`${styles.Card} ${toggleRotate ? styles.fitContent : ""}`}>
      <h2>{list.listTitle}</h2>
      <div className={styles.CardInfo}>
        <span>{list.category}</span>
        <span>{list.date}</span>
      </div>
      <div
        className={styles.CardChevron}
        onClick={() => handleToggle(list._id)}
      >
        <FontAwesomeIcon icon={faChevronCircleDown} />
      </div>
      <div
        className={`${styles.CardItemsBox} ${
          toggleRotate ? styles.show : styles.hide
        }`}
      >
        {list.listItem.map((item) => (
          <label
            htmlFor={item.id}
            key={item.id}
            className={item.isComplete ? styles.completeItem : ""}
          >
            <CardItem>
              {item.itemValue}
              {/* {loadingUpdate.forEach((el) => el.id === item.id) === item.id ? ( */}
              {targetCheckboxID === item.id && loadingUpdate ? (
                <Loader width="20px" top={"auto"} left={"225px"} />
              ) : (
                <input
                  style={{ position: "relative" }}
                  type="checkbox"
                  key={item.id}
                  id={item.id}
                  value={item.id}
                  checked={isCompleteItems.includes(item.id)}
                  onChange={(e) => handleCheckbox(e, list)}
                />
              )}
            </CardItem>
          </label>
        ))}
      </div>
      <div
        className={
          toggleRotate
            ? `${styles.CardMenuTopButtons} ${styles.show}`
            : styles.CardMenuTopButtons
        }
      >
        <FontAwesomeIcon icon={faEdit} onClick={() => onEdit(list)} />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => deleteCardHandler(list._id)}
        />
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
};

export default Card;

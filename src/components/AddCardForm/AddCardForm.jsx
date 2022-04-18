import React, { useEffect, useRef, useState } from "react";
import styles from "./AddCardForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import useOutsideAlerter from "../../hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { addListRequest } from "../../redux/sagas/userData";
import Button from "../../common/Button/Button";

const AddCardForm = () => {
  const [form, setForm] = useState({ title: "", category: "" });
  const [focused, setFocused] = useState(false);
  const [listItem, setListItem] = useState([
    { itemValue: "", isComplete: false, id: `${Date.now()}` },
  ]);

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onFocusOpenHandler = () => {
    setFocused(true);
  };

  const onFocusCloseHandler = () => {
    setForm({
      title: "",
      category: "",
    });
    setListItem([{ itemValue: "", isComplete: false, id: `${Date.now()}` }]);
    setFocused(false);
  };

  //* generate inputs
  const handleInputChange = (idx, e) => {
    let values = [...listItem];
    values[idx][e.target.name] = e.target.value;
    setListItem(values);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...listItem];
    list.splice(index, 1);
    setListItem(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    listItem.itemValue !== "" &&
      setListItem([
        ...listItem,
        { itemValue: "", isComplete: false, id: `${Date.now()}` },
      ]);
  };
  //* generate inputs END

  // ADD NEW CARD
  const saveNewCard = (e) => {
    e.preventDefault();
    const newCard = {
      listTitle: form.title,
      category: form.category,
      date: Date.now(),
      listItem,
      isFavorite: false,
    };
    dispatch(addListRequest(newCard));

    onFocusCloseHandler();
  };
  // !
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onFocusCloseHandler);
  return (
    <div ref={wrapperRef} className={styles.AddCardForm}>
      <input
        name="title"
        onChange={onChange}
        onClick={onFocusOpenHandler}
        value={form.title}
        placeholder="Add title of new card"
        className={styles.AddCardInput}
      />
      <input
        name="category"
        onChange={onChange}
        value={form.category}
        placeholder="Add card category"
        className={`${styles.AddCardInput} ${
          focused ? styles.show : styles.hide
        }`}
      />
      <div
        className={`${styles.AddCardItemsBox} ${
          focused ? styles.show : styles.hide
        }`}
      >
        {listItem.map((field, idx) => {
          return (
            <div
              key={field.id}
              style={{
                width: "100%",
                display: "flex",
                msFlexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <input
                name="itemValue"
                placeholder="Enter new item"
                value={field.itemValue}
                id={field.id}
                onChange={(e) => handleInputChange(idx, e)}
                className={styles.AddCardItems}
                required
                // onBlur={field.itemValue && handleAddClick}
              />
              <div
                className="btn-box"
                style={{ position: "absolute", right: "10px" }}
              >
                {listItem.length !== 1 && (
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => handleRemoveClick(idx)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${styles.AddCardToolbar} ${
          focused ? styles.show : styles.hide
        }`}
      >
        <span className={styles.AddCardToolbarItem} onClick={handleAddClick}>
          <FontAwesomeIcon icon={faPlusCircle} />
          Add item
        </span>
        <FontAwesomeIcon icon={faCalendarDay} />
        <FontAwesomeIcon icon={faCalendarDay} />
        <FontAwesomeIcon icon={faCalendarDay} />
        <FontAwesomeIcon icon={faCalendarDay} />
      </div>
      <div
        className={`${styles.AddCardButtons} ${
          focused ? styles.show : styles.hide
        }`}
      >
        <Button
          onClick={saveNewCard}
          disabled={!form.title || !form.category}
          variant="success"
          size="xs"
        >
          Save
        </Button>
        <Button onClick={onFocusCloseHandler} variant="danger" size="lg">
          Close
        </Button>
      </div>
    </div>
  );
};

export default AddCardForm;

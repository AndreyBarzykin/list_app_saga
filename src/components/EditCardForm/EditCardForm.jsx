import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Form from "../../common/Form/Form";
import Button from "../../common/Button/Button";
import FormInput from "../../common/Form/FormInput/FormInput";
import List from "../../common/List/List";
import CustomModal from "../../common/Modal/Modal";
import { toggleEditModal } from "../../redux/sagas/modals";
import {
  clearCurrentList,
  updateCurrentListRequest,
} from "../../redux/sagas/userData";
import styles from "./EditCardForm.module.scss";
import { getDate } from "../../utils/getDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
const EditCardForm = () => {
  const dispatch = useDispatch();
  const { editModal } = useSelector((state) => state.modalReducer);
  const { current } = useSelector((state) => state.userDataReducer);
  const [date, setDate] = useState(getDate());
  const [listTitle, setListTitle] = useState(current?.listTitle);
  const [category, setCategory] = useState(current?.category);
  const [listItem, setListItem] = useState(current?.listItem || []);

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

  const onCloseEditCard = () => {
    dispatch(toggleEditModal());
    dispatch(clearCurrentList());
  };

  // Save changed list
  const saveList = (e) => {
    e.preventDefault();
    const updList = {
      id: current._id,
      listTitle,
      date,
      category,
      listItem,
      // isFavorites,
    };
    dispatch(updateCurrentListRequest(updList));
    dispatch(clearCurrentList());
    dispatch(toggleEditModal());
  };

  useEffect(() => {
    if (current) {
      setListTitle(current?.listTitle);
      setCategory(current?.category);
      // setForm({ title: current?.listTitle, category: current?.listTitle });
      // setForm({
      //   title: current?.listTitle,
      //   category: current?.listTitle,
      // });
      setDate(current?.date);
      setListItem(current?.listItem);
      // console.log(form);
      // setIsFavorites(current?.isFavorites);
    }
  }, [current]);

  return (
    editModal && (
      <CustomModal
        title="Edit Card"
        showModal={editModal}
        withCloseButton={true}
        onClose={onCloseEditCard}
        actionFooterBar={
          <>
            <div className={styles.EditCardToolbar}>
              <span className={styles.EditCardToolbarItem} onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Add item
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
              <Button type="button" variant="primary" onClick={saveList}>
                Edit & save
              </Button>
              {/* <Button>Cancel</Button> */}
            </div>
          </>
        }
      >
        <Form>
          <FormInput
            label="Title: "
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
          />
          <FormInput
            label="Category: "
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <div>{current.date}</div>
          <div className={styles.CardItemsBox}>
            <List>
              {listItem.map((field, idx) => (
                <li key={idx + field.id}>
                  <>
                    <input
                      key={field.id}
                      className={styles.CardItemsInput}
                      name="itemValue"
                      placeholder="Enter Shopping Item"
                      value={field.itemValue}
                      id={field.id}
                      onChange={(e) => handleInputChange(idx, e)}
                      required
                    />
                    <FontAwesomeIcon
                      key={field.id + idx}
                      icon={faTimes}
                      color="#f2777a"
                      onClick={() => handleRemoveClick(idx)}
                    />
                  </>
                </li>
              ))}
            </List>
          </div>
        </Form>
      </CustomModal>
    )
  );
};

export default EditCardForm;

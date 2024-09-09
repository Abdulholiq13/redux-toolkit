import React, { useState } from "react";
import "./AllUsers.css";
import Users from "../../components/users/Users";
import Empty from "../../components/empty/Empty";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { updateToUser } from "../../context/user-slice";

function AllUsers() {
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateToUser(selectedUser));
    setShow(false);
    setSelectedUser(null);
  };

  window.addEventListener("keydown", (e) => {
    if (e.which === 27) {
      setShow(false);
    }
  });

  return (
    <div className="all__users">
      {user.length ? <Users data={user} setSelectedUser={setSelectedUser} setShow={setShow} /> : <Empty />}
      {show && (
        <div className="modal">
          <div className="overlay" onClick={() => setShow(false)}></div>
          <div className="modal-content">
            <form onSubmit={handleUpdate} className="modal-form">
              <input
                type="text"
                placeholder="Name"
                value={selectedUser?.name || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Profession"
                value={selectedUser?.profession || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, profession: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={selectedUser?.age || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}
                required
              />
              <select
                className="form-select"
                value={selectedUser?.gender || ""}
                onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button className="form-button" type="submit">
                Update User
              </button>
            </form>
            <button className="close-button" onClick={() => setShow(false)}>
              <FaWindowClose className="close-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;

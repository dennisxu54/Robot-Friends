const RobotCard = ({ item, index, onShowModal, onDelete }) => {
  return (
    <div className="special-box">
      <img alt="robots" src={`https://robohash.org/${item.id}&200x200`} />
      <h2>{item.name}</h2>
      <h3>{item.username}</h3>
      <h3>{item.email}</h3>
      <div className="show-delete-button">
        <button
          className="delete-button"
          onClick={() => {
            onDelete(index);
          }}
        >
          Delete
        </button>
      </div>
      <div className="show-info-button">
        <button
          className="information-button"
          onClick={() => {
            onShowModal(index);
          }}
        >
          Information
        </button>
      </div>
    </div>
  );
};

export default RobotCard;

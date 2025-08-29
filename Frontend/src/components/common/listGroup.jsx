const ListGroup = ({ list: items, currItem, onClick }) => {
  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {items.map((item, index) => (
        <li
          key={index}
          className={
            currItem == index + 1 ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onClick(index + 1)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;

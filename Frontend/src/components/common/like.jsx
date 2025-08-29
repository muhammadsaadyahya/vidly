// Input liked:boolean
// Output: onClick

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";

  if (!liked) classes = "fa fa-heart-o";

  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={onClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;

import { Link } from "react-router-dom";

interface IProps {
  room?: string;
}

const Draw: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <div>
        <h1>{props.room}</h1>
      </div>
    </>
  )
};

export default Draw;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  	room?: string;
	setRoom: (room: string | undefined) => void;
}

const Draw: React.FC<IProps> = (props: IProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (props.room === undefined) {
			navigate('/');
		} else {
			navigate('/draw');
		}
	}, [props.room]);

	return (
		<>
			<div>
				<h1>{props.room}</h1>
			</div>
			<button onClick={() => props.setRoom(undefined)}>Leave Room</button>
		</>
	)
};

export default Draw;
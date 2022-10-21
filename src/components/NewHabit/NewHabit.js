import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../providers/UserData";
import Day from "../Day/Day";
import { BASE_URL } from "../../constants/urls";
import { accentColor } from "../../constants/colors";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function NewHabit({ setShowNewHabit }) {
	const { userData } = useContext(UserContext);
	const daysList = ["D", "S", "T", "Q", "Q", "S", "S"];
	const [selectedDays, setSelectedDays] = useState([]);
	const [habitName, setHabitName] = useState("");

	function createHabit() {
		const config = {
			headers: {
				Authorization: `Bearer ${userData.token}`,
			},
		};

		const body = {
			name: habitName,
			days: selectedDays,
		};

		axios
			.post(`${BASE_URL}/habits`, body, config)
			.then((res) => {
        toast.success(`Hábito ${habitName} criado com sucesso!`, {
					position: "top-center",
					autoClose: 1000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
        setShowNewHabit(false)
			})
			.catch((err) => {
				console.log(err);
				toast.error("Erro ao salvar hábito, tente novamente!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "dark",
				});
			});
	}

	return (
			<NewHabitContainer>
				<input required name="email" value={habitName} type="text" placeholder="Nome do hábito" onChange={(e) => setHabitName(e.target.value)} />
				<DaysList>
					{daysList.map((day, i) => (
						<Day disabled={false} key={i} selectedDays={selectedDays} index={i} setSelectedDays={setSelectedDays}>
							{day}
						</Day>
					))}
				</DaysList>
				<CancelConfirm>
					<button onClick={() => setShowNewHabit(false)}>Cancelar</button>
					<button onClick={createHabit}>Salvar</button>
				</CancelConfirm>
			</NewHabitContainer>
	);
}

const NewHabitContainer = styled.div`
	padding: 15px;
	margin-bottom: 20px;
	background-color: white;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	input {
		width: 100%;
	}
`;

const CancelConfirm = styled.div`
	margin-top: 10px;
	align-self: flex-end;
	display: flex;
	gap: 10px;
  button:nth-child(1) {
    font-size: 16px;
	  border: none;
	  background: none;
	  color: ${accentColor};
  }
  button:nth-child(2) {
    font-size: 16px;
	  width: 84px;
	  height: 35px;
  }
`;


const DaysList = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;
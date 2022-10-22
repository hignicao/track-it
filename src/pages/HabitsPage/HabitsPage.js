import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserData";
import styled from "styled-components";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Habit from "../../components/Habit/Habit";
import NewHabit from "../../components/NewHabit/NewHabit";
import { AiFillPlusCircle } from "react-icons/ai";
import { accentColor, baseColor } from "../../constants/colors";
import { BASE_URL } from "../../constants/urls";

export default function HabitsPage() {
	const { userData } = useContext(UserContext);
	const [myHabits, setMyHabits] = useState(undefined);
	const [showNewHabit, setShowNewHabit] = useState(false)
	const [selectedDays, setSelectedDays] = useState([]);
	const [habitName, setHabitName] = useState("");
	const [reloadList, setReloadList] = useState(false)

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${userData.token}`,
			},
		};

		axios
			.get(`${BASE_URL}/habits`, config)
			.then((res) => {
				setMyHabits(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [userData.token, showNewHabit, reloadList]);

	return (
		<HabitsPageContainer>
			<NavBar />
			<div>
				<MyHabitsNewHabit>
					<p>Meus hábitos</p>
					<button onClick={() => setShowNewHabit(true)}>
						<AiFillPlusCircle />
					</button>
				</MyHabitsNewHabit>
				{showNewHabit && <NewHabit setShowNewHabit={setShowNewHabit} selectedDays={selectedDays} setSelectedDays={setSelectedDays} habitName={habitName} setHabitName={setHabitName}/>}
				{myHabits === undefined ? (
					<MyHabitsList>
						<p>Carregando...</p>
					</MyHabitsList>
				) : (
					<MyHabitsList>
						{myHabits.map((hab) => (
							<Habit key={hab.id} habit={hab} reloadList={reloadList} setReloadList={setReloadList}/>
							))}
						{(myHabits === undefined || myHabits.length === 0) &&
							<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
						}
					</MyHabitsList>
				)}
			</div>
			<Footer />
		</HabitsPageContainer>
	);
}

const HabitsPageContainer = styled.div`
	padding: 90px 20px 130px 20px;
`;

const MyHabitsNewHabit = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
	p {
		color: ${baseColor};
		font-weight: 400;
		font-size: 22.976px;
		line-height: 29px;
	}
	button {
		padding: 5px 0 0 0;
		font-size: 40px;
		color: ${accentColor};
		background: none;
	}
`;

const MyHabitsList = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	> p {
		font-size: 17.976px;
		line-height: 22px;
	}
`;
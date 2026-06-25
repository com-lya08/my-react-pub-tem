import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";

import "./App.css";
import "./styles/reset.scss";
import "./styles/style.scss";
// import Button from "./components/Button/Button";//css import
// import "krds-react/dist/index.css";
// import { Button } from "krds-react";
// import { Calendar } from "krds-react";
// import MyModal from "./components/Modal/ModalRoot";
import ModalRoot from "./components/Modal/ModalRoot";
import { useModalStore } from "./stores/useModalStore";
import Button from "./components/Button/Button";
import Layout from "./components/Layout/Layout";
import ThemeToggle from "./components/Toggle/Toggle";

function App() {
	const [count, setCount] = useState(0);
	const [user, setUser] = useState(null);
	const [data, setData] = useState([]);
	// const [open, setOpen] = useState(false);
	const openModal = useModalStore((state) => state.openModal);

	useEffect(() => {
		const getUser = async () => {
			const res = await fetch("https://raw.githubusercontent.com/sooowan/api/master/data/info.json");
			const json = await res.json();
			setUser(json);
		};

		const getData = async () => {
			const res = await fetch("https://raw.githubusercontent.com/sooowan/api/master/data/works.json");
			const json = await res.json();
			// console.log(json);
			setData(json);
		};

		getUser();
		getData();
	}, []);

	return (
		<>
			<Layout>
				<main id="contents" className="main">
					<div className="content-wrap">
						<div className="content-header">
							<h2 className="title-md">template</h2>
						</div>
						<div className="content-body">
							<section id="center">
								<h1 className="text-3xl font-bold underline">Hello world!</h1>
								<Button type="button" variant="btn-secondary" onClick={() => setCount((count) => count + 1)}>
									Count is {count}
								</Button>
								<ThemeToggle/>
								<Button
									onClick={() =>
										openModal({
											title: "Zustand",
											content: "Zustand 모달입니다",
										})
									}
								>
									저장
								</Button>

								<ModalRoot />

								<h2> {user ? user.name : "loading..."}</h2>

								{data.map((dt) => (
									<dl key={dt._id} className="list">
										<dt>{dt.title.ico}</dt>
										<dd>{dt.desc}</dd>
									</dl>
								))}
							</section>
						</div>
					</div>
				</main>
			</Layout>
		</>
	);
}

export default App;

/**
 * Fragment(명사;파편) (<> </> = <Fragment></Fragment>)
 * 실제 DOM에 생성되지 않음, 그래서 클래스나 이벤트 등록 안됨.
 * <> </>,  <Fragment></Fragment> 둘 차이는 key등록 가능여부.
 * */

/**
 * item => (JSX)
 * item => {
		return (JSX); **한줄일떄 () 생략 가능
		}
 * */

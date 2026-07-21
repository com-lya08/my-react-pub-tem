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
import Tab from "./components/Tab/Tab";
import Accordion from "./components/Accordion/Accordion";
import DropdownList from "./components/Dropdown/DropdownList";

function App() {
	const [count, setCount] = useState(0);
	const [user, setUser] = useState(null);
	const [data, setData] = useState([]);
	// const [open, setOpen] = useState(false);
	const openAlert = useModalStore((state) => state.openAlert);
	const openCustom = useModalStore((state) => state.openCustom);
	const openConfirm = useModalStore((state) => state.openConfirm);
	const openBottomsheet = useModalStore((state) => state.openBottomsheet);

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

	const tabs = [
		{
			name: "링크 탭",
			tag: "a",
			url: "https://www.naver.com",
			target: "_blank",
		},
		{
			name: "버튼 탭1",
			tag: "button",
			content: "이건 탭 내용이다....",
		},
		{
			name: "버튼 탭2",
			tag: "button",
			content: "이건 탭 내용이다....!!!!!!!!!!!!!!!!",
		},
	];
	const accordions = [
		{
			title: "아코딘언ㄴㄴㄴㄴㄴ",
			content: "content",
		},
		{
			title: "아코딘언dddddddddd",
			content: "content2content2content2content2content2content2content2content2content2",
		},
		{
			title: "아코딘언ㄴㄴㄴㄴㄴ",
			content: "content3",
		},
	];

	const dropdowns = [
		{
			id: "dropdowm01",
			title: "item1",
			lists: [{ name: "item111", url: "#" }],
		},
		{
			id: "dropdowm02",
			title: "item2",
			lists: [{ name: "item111" }, { name: "item111" }, { name: "item111" }, { name: "item111" }],
		},
	];

	return (
		<>
			<Layout>
				<main id="contents" className="main">
					<div className="content-wrap">
						<div className="content-header">
							<h2 className="title-md">template</h2>
						</div>
						<div className="content-body">
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">탭</h3>
								</div>
								<div className="sec-body">
									<Tab tabs={tabs} />
								</div>
							</section>
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">아코디언</h3>
								</div>
								<div className="sec-body">
									<Accordion accordions={accordions} multi={false} />
								</div>
							</section>
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">드롭다운</h3>
								</div>
								<div className="sec-body">
									<DropdownList dropdowns={dropdowns} multi={true} />
								</div>
							</section>
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">data fetch</h3>
								</div>
								<div className="sec-body">
									<h2> {user ? user.name : "loading..."}</h2>

									{data.map((dt) => (
										<dl key={dt._id} className="list">
											<dt>{dt.title.ico}</dt>
											<dd>{dt.desc}</dd>
										</dl>
									))}
								</div>
							</section>
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">버튼</h3>
								</div>
								<div className="sec-body">
									<div className="btn-wrap align-left">
										<Button type="button" variant="btn-secondary" onClick={() => setCount((count) => count + 1)}>
											Count is {count}
										</Button>
										<ThemeToggle />
										<Button
											onClick={() =>
												openAlert({
													title: "Zustand",
													content: "Zustand 모달입니다",
													// children:
												})
											}
										>
											저장
										</Button>
										<Button
											onClick={() =>
												openConfirm({
													title: "Zustand",
													content: "openConfirm 모달입니다",
													closeOnConfirm: true,
													onConfirm: () => {
														alert("테스트입니다.");
													},
												})
											}
										>
											openConfirm
										</Button>

										<Button
											onClick={() =>
												openCustom({
													title: "test",
													content: (
														<>
															<h2>so funky!!!!</h2>
														</>
													),
													footer: ({ id, runAction }) => (
														<div className="btn-wrap">
															<Button
																variant="btn-secondary"
																onClick={() =>
																	openConfirm({
																		title: "TITLE",
																		content: "ㅋㅋㅋㅋ 모달입니다",
																		// closeOnConfirm: true,
																		// children:
																		onConfirm: () =>
																			openBottomsheet({
																				title: "BottomSheet",
																				content: "3중 모달입니다.",
																				footer: ({ id, runAction }) => (
																					<div className="btn-wrap">
																						<Button
																							variant="btn-line"
																							onClick={() => {
																								runAction(id, "onCancel");
																							}}
																						>
																							닫기
																						</Button>
																					</div>
																				),
																			}),
																	})
																}
															>
																동의함
															</Button>
															<Button
																variant="btn-line"
																onClick={() => {
																	runAction(id, "onCancel");
																}}
															>
																취소
															</Button>
														</div>
													),
													// children:
												})
											}
										>
											커스텀 모달
										</Button>
									</div>
								</div>
							</section>

							<ModalRoot />
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

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
import ThemeToggle from "./components/Toggle/ThemeToggle";
import Tab from "./components/Tab/Tab";
import Accordion from "./components/Accordion/Accordion";
import DropdownList from "./components/Dropdown/DropdownList";
import Checkbox from "./components/ControlBox/CheckBox";
import RadioBox from "./components/ControlBox/RadioBox";
import FontSizeSetRadioBox from "./components/ControlBox/FontSizeSetRadioBox";

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
			name: "버튼 탭1",
			tag: "button",
			content:
				"우리가 살아가는 세상은 끊임없이 변화하고 있으며, 과거에는 당연하게 여겨졌던 방식들이 시간이 지나면서 새로운 기술과 가치관의 등장으로 인해 더 이상 같은 의미를 가지지 않게 되는 경우가 많지만, 이러한 변화 속에서도 변하지 않는 중요한 요소는 스스로 생각하고 판단하며 자신의 삶에 책임을 지는 태도라고 할 수 있다. 사람은 누구나 목표를 이루기 위해 노력하는 과정에서 예상하지 못한 장애물을 만나고 때로는 자신이 가진 능력에 대한 의심이나 앞으로 나아갈 방향에 대한 불안감을 느끼기도 하지만, 그러한 순간들이 반드시 부정적인 경험으로만 남는 것은 아니며, 오히려 어려움을 극복하기 위해 고민하고 새로운 방법을 찾는 과정에서 이전보다 더욱 성숙한 자신을 만들어 가는 계기가 될 수 있다. 결국 의미 있는 성장은 한순간에 이루어지는 것이 아니라 매일의 작은 노력과 경험이 차곡차곡 쌓여 만들어지는 결과이며, 다른 사람과 비교하기보다는 자신의 속도에 맞춰 꾸준히 발전하려는 자세를 유지할 때 비로소 자신만의 가치와 가능성을 발견할 수 있다.",
		},
		{
			name: "버튼 탭2",
			tag: "button",
			content:
				"현대 사회에서 사람들은 수많은 정보와 다양한 관계 속에서 살아가며, 빠르게 변화하는 환경에 적응하기 위해 끊임없이 새로운 지식을 배우고 자신의 능력을 발전시키려고 노력하지만, 때로는 지나치게 많은 목표와 기대 속에서 정작 자신이 무엇을 중요하게 생각하는지 잊어버리기도 한다. 우리는 더 많은 것을 얻기 위해 바쁘게 움직이는 과정에서 현재의 순간이 가진 의미를 놓치거나 주변 사람들과의 소중한 관계를 충분히 돌아보지 못하는 경우가 있지만, 진정한 행복은 단순히 많은 성과를 이루거나 외부에서 인정받는 것만으로 완성되는 것이 아니라, 자신이 원하는 삶의 방향을 이해하고 작은 일상 속에서도 만족과 의미를 발견하는 데서 시작된다. 또한 다른 사람의 삶과 비교하며 부족한 점만 바라보기보다는 각자가 가진 경험과 개성을 존중하고, 실패와 실수를 성장의 과정으로 받아들이며 조금씩 앞으로 나아가는 태도가 필요하다. 결국 삶의 가치는 얼마나 빠르게 목적지에 도착했는지가 아니라, 그 과정에서 어떤 생각을 하고 어떤 사람으로 변화해 가는지에 의해 결정되며, 자신만의 속도로 꾸준히 걸어가는 사람이야말로 시간이 지날수록 더욱 단단한 자신을 만들어 갈 수 있다.",
		},
		{
			name: "링크 탭",
			tag: "a",
			url: "https://www.naver.com",
			target: "_blank",
		},
	];
	const accordions = [
		{
			title: "아코딘언_현대 사회에서 사람들은 수많은 정보와 다양한 관계 속에서 살아가며",
			content: "content",
		},
		{
			title: "아코디언_긴내용내용내용",
			content:
				"현대 사회에서 사람들은 수많은 정보와 다양한 관계 속에서 살아가며, 빠르게 변화하는 환경에 적응하기 위해 끊임없이 새로운 지식을 배우고 자신의 능력을 발전시키려고 노력하지만, 때로는 지나치게 많은 목표와 기대 속에서 정작 자신이 무엇을 중요하게 생각하는지 잊어버리기도 한다. 우리는 더 많은 것을 얻기 위해 바쁘게 움직이는 과정에서 현재의 순간이 가진 의미를 놓치거나 주변 사람들과의 소중한 관계를 충분히 돌아보지 못하는 경우가 있지만, 진정한 행복은 단순히 많은 성과를 이루거나 외부에서 인정받는 것만으로 완성되는 것이 아니라, 자신이 원하는 삶의 방향을 이해하고 작은 일상 속에서도 만족과 의미를 발견하는 데서 시작된다. 또한 다른 사람의 삶과 비교하며 부족한 점만 바라보기보다는 각자가 가진 경험과 개성을 존중하고, 실패와 실수를 성장의 과정으로 받아들이며 조금씩 앞으로 나아가는 태도가 필요하다. 결국 삶의 가치는 얼마나 빠르게 목적지에 도착했는지가 아니라, 그 과정에서 어떤 생각을 하고 어떤 사람으로 변화해 가는지에 의해 결정되며, 자신만의 속도로 꾸준히 걸어가는 사람이야말로 시간이 지날수록 더욱 단단한 자신을 만들어 갈 수 있다.",
		},
		{
			title: "아코디언입니다.",
			content: "content3",
		},
	];

	const dropdowns = [
		{
			id: "dropdowm01",
			title: "item1",
			lists: [{ name: "네이버", url: "http://www.naver.com", target: "_blank" }],
		},
		{
			id: "dropdowm02",
			title: "item2",
			lists: [
				{ name: "옵션001", url: "#" },
				{ name: "옵션002", url: "#" },
			],
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
									<Accordion accordions={accordions} type="multi" />
								</div>
							</section>
							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">드롭다운</h3>
								</div>
								<div className="sec-body">
									<DropdownList dropdowns={dropdowns} type="single" />
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

							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">스위치</h3>
								</div>
								<div className="sec-body">
									<ThemeToggle title="다크모드 선택" name="themeToggle" id="themeToggle" srOnly={true}>
										다크모드
									</ThemeToggle>
								</div>
							</section>

							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">체크박스</h3>
								</div>
								<div className="sec-body">
									<div className="flex flex-start">
									<Checkbox title="checkbox test1" name="checkbox01" id="checkbox01">checkbox test1</Checkbox>
									<Checkbox title="checkbox test3" className="size-lg" name="checkbox03" id="checkbox03">checkbox test3</Checkbox>
									</div>
								</div>
							</section>

							<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">라디오박스</h3>
								</div>
								<div className="sec-body">
									<div className="flex flex-start">
									<RadioBox title="radiobox test1" name="radiobox" id="radiobox01">radio test1</RadioBox>
									<RadioBox title="radiobox test3" className="size-lg" name="radiobox" id="checkbox03">radio test3</RadioBox>
									</div>
								</div>
							</section>

								<section className="section">
								<div className="sec-header">
									<h3 className="title-sm font-secondary">글씨설정</h3>
								</div>
								<div className="sec-body">
									<FontSizeSetRadioBox/>
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

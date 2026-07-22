import { useState } from "react";
import Dropdown from "./Dropdown";
import { useEffect, useRef } from "react";

export default function DropdownList({ dropdowns, multi = false }) {
	const dropdownRef = useRef(null);
	const [expanded, setExpanded] = useState([]);

	const handleToggle = (id) => {
		if (multi) {
			setExpanded(
				(
					prev, // 기존 열려있는 id배열 (리액트가 넘겨주는 값) => setExpanded에 함수를 전달하면 React가 현재 상태(state)를 첫 번째 인자로 전달해 주기 때문입니다.
				) =>
					prev.includes(id) // 현재 id가 포함되어 있다면
						? prev.filter((item) => item !== id) // 현재 id만 제거
						: [...prev, id], // 아니면 기존 배열에 현재 id추가
			);
		} else {
			setExpanded(
				(prev) => (prev.includes(id) ? [] : [id]), // 현재 id가 포함되어 있다면 배열 모두 제거 아니면 현재 배열만 저장
			);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setExpanded([]); // 모두 닫기
			}
		};

		document.addEventListener("pointerdown", handleClickOutside);
		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, []);

	return (
		<div className="ui-dropdown" ref={dropdownRef}>
			{dropdowns.map((dropdown) => (
				<Dropdown key={dropdown.id} dropdowm={dropdown} expanded={expanded.includes(dropdown.id)} onToggle={handleToggle} />
			))}
		</div>
	);
}

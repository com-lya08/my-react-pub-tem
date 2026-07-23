import { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button/Button";
import { motion } from "framer-motion";

export default function Tab({ tabs }) {
	const [activeIndex, setActiveIndex] = useState(0);

	const contentRef = useRef(null);
	const [height, setHeight] = useState("auto");

	useLayoutEffect(() => {
		const element = contentRef.current;

		if (!element) return;

		const updateHeight = () => {
			setHeight(element.scrollHeight);
		};

		updateHeight();

		const observer = new ResizeObserver(updateHeight); // 컨텐츠 길이 변화 감지
		observer.observe(element);

		return () => observer.disconnect();
	}, [activeIndex]);

	return (
		<div className="tab-wrap">
			<div className="tab-list" role="tablist" aria-label="탭메뉴">
				{tabs.map((tab, index) => {
					const active = activeIndex === index;

					return tab.tag === "button" ? (
						<Button key={tab.name} role="tab" id={`tab-${index}`} aria-label={active ? "선택됨" : ""} aria-selected={active} aria-controls={`panel-${index}`} tabIndex={active ? 0 : -1} variant="tab-btn" className={`tab-btn ${active ? "active" : ""}`} onClick={() => setActiveIndex(index)}>
							{tab.name}
						</Button>
					) : (
						<a key={tab.name} href={tab.url ?? "#"} target={tab.target ?? "_self"} className="tab-btn">
							{tab.name}
						</a>
					);
				})}
			</div>

			<motion.div animate={{ height }} transition={{ duration: 0.35, ease: "easeInOut" }} className="tab-content">
				<div id={`panel-${activeIndex}`} role="tabpanel" aria-labelledby={`tab-${activeIndex}`}>
					<motion.div
						className="panel-inner"
						key={activeIndex}
						ref={contentRef}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.35,
						}}
					>
						{tabs[activeIndex].content}
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}

/**
 *
 * 바깥 tab-content
계속 유지되는 컨테이너
이전 높이를 기억해야 하므로 key를 주지 않음
animate={{ height }}만 실행
 * 안쪽 panel-inner
탭이 바뀔 때마다 새로운 콘텐츠
key={activeIndex}를 줘서 새 컴포넌트로 인식시킴
initial → animate가 다시 실행되어 fade 효과 적용
 */

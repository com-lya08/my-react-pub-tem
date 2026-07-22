import { useState, useRef, useLayoutEffect } from "react";
import Button from "../Button/Button";
import { motion } from "framer-motion";

export default function Tab({ tabs }) {
	const [activeIndex, setActiveIndex] = useState(0);

	const contentRef = useRef(null);
	const [height, setHeight] = useState("auto");

	useLayoutEffect(() => {
		if (!contentRef.current) return;

		const nextHeight = contentRef.current.scrollHeight;
		setHeight(nextHeight);
	}, [activeIndex]);

	return (
		<div className="tab-wrap">
			<div className="tab-list" role="tablist" aria-label="탭메뉴">
				{tabs.map((tab, index) => {
					const active = activeIndex === index;

					return tab.tag === "button" ? (
						<Button key={tab.name} role="tab" id={`tab-${index}`} aria-selected={active} aria-controls={`panel-${index}`} tabIndex={active ? 0 : -1} variant="tab-btn" className={`tab-btn ${active ? "active" : ""}`} onClick={() => setActiveIndex(index)}>
							{tab.name}
						</Button>
					) : (
						<a key={tab.name} href={tab.url ?? "#"} target={tab.target ?? "_self"} className="tab-btn">
							{tab.name}
						</a>
					);
				})}
			</div>

			<motion.div
				animate={{ height }}
				transition={{ duration: 0.35, ease: "easeInOut" }}
				className="tab-content"
			>
				<div id={`panel-${activeIndex}`} role="tabpanel" aria-labelledby={`tab-${activeIndex}`}>
					<motion.div
						className="panel-inner"
						key={activeIndex}
						ref={contentRef}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1 , y: 0}}
						exit={{ opacity: 0, y: 10 }}
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

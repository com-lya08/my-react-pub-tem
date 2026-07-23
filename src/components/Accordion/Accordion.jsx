import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ accordions, type }) {
	const [activeIndex, setActiveIndex] = useState(null);
	const [activeIndexes, setActiveIndexes] = useState([]);
	const isMulti = type === "multi";

	const handleClick = (index) => {
		if (isMulti) {
			setActiveIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
		} else {
			setActiveIndex((prev) => (prev === index ? -1 : index));
		}
	};
	return (
		<div className={`ui-accordion ${isMulti ? "multi" : ""}`}>
			{accordions.map((accordion, index) => {
				const active = isMulti ? activeIndexes.includes(index) : activeIndex === index;

				return (
					<div key={index} className="accordion-item">
						<button className={`acc-btn ${active ? "active" : ""}`} aria-expanded={active} aria-label={active ? "접기" : "펼치기"} onClick={() => handleClick(index)}>
							{accordion.title}
						</button>

						<AnimatePresence initial={false}>
							{active && (
								<motion.div
									className="acc-panel"
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{
										duration: 0.35,
										ease: "easeInOut",
									}}
								>
									<div className="panel-inner">{accordion.content}</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
}

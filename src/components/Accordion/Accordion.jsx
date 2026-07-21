import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({ accordions, multi }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeIndexes, setActiveIndexes] = useState([]);

	const handleClick = (index) => {
		if (multi) {
			setActiveIndexes((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
		} else {
			setActiveIndex((prev) => (prev === index ? -1 : index));
		}
	};

	return (
		<div className={`ui-accordion ${multi ? "multi" : ""}`}>
			{accordions.map((accordion, index) => {
				const active = multi ? activeIndexes.includes(index) : activeIndex === index;

				return (
					<div key={index} className="accordion-item">
						<button className={`acc-btn ${active ? "active" : ""}`} aria-expanded={active} onClick={() => handleClick(index)}>
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

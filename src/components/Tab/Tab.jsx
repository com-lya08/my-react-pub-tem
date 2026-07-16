import { useState } from "react";
import Button from "../Button/Button";

export default function Tab({ tabs }) {
	const [activeIndex, setActiveIndex] = useState(0);

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
						<a key={tab.name} href={tab.href ?? "#"} className="tab-btn">
							{tab.name}
						</a>
					);
				})}
			</div>

			<div className="tab-content">
				<div id={`panel-${activeIndex}`} role="tabpanel" aria-labelledby={`tab-${activeIndex}`}>
					<div className="panel-inner">{tabs[activeIndex].content}</div>
				</div>
			</div>
		</div>
	);
}

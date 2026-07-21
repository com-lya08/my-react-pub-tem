import { useState } from "react";
import Dropdown from "./Dropdown";

export default function DropdownList({ dropdowns, multi = false }) {
	const [expanded, setExpanded] = useState([]);

	const handleToggle = (id) => {
		if (multi) {
			setExpanded((prev) =>
				prev.includes(id)
					? prev.filter((item) => item !== id)
					: [...prev, id]
			);
		} else {
			setExpanded((prev) =>
				prev.includes(id) ? [] : [id]
			);
		}
	};

	return (
		<div className="ui-dropdown">
			{dropdowns.map((dropdown) => (
				<Dropdown
					key={dropdown.id}
					dropdowm={dropdown}
					expanded={expanded.includes(dropdown.id)}
					onToggle={handleToggle}
				/>
			))}
		</div>
	);
}

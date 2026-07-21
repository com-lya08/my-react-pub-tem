import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown({ dropdowm, expanded, onToggle }) {
	return (
		<div className="dropdown-item">
			<button className="dropdown-btn" aria-expanded={expanded} aria-controls={dropdowm.id} onClick={() => onToggle(dropdowm.id)}>
				{dropdowm.title}
			</button>

			<AnimatePresence initial={false}>
				{expanded && (
					<motion.ul
						className="dropdown-list"
						id={dropdowm.id}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							duration: 0.35,
						}}
					>
						{dropdowm.lists.map((list, index) => (
							<li key={index}>
								{list.url ? (
									<a href={list.url} target={list.target || "_self"} rel={list.target === "_blank" ? "noopener noreferrer" : ""}>
										{list.name}
									</a>
								) : (
									list.name
								)}
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
}

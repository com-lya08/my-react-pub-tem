import { AnimatePresence, motion } from "framer-motion";

export default function Dropdown({ dropdowm, expanded, onToggle }) {
	return (
		<div className="dropdown-item">
			<button className={`dropdown-btn ${expanded ? "active" : ""}`} aria-expanded={expanded} aria-label={`${dropdowm.title} ${expanded ? "닫기" : "열기"}`} aria-controls={dropdowm.id} onClick={() => onToggle(dropdowm.id)}>
				{dropdowm.title}
			</button>

			<AnimatePresence initial={false}>
				{expanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							duration: 0.35,
						}}
						className="dropdown-list"
					>
						<ul id={dropdowm.id}>
							{dropdowm.lists.map((list, index) => (
								<li key={index}>
									{list.url ? (
										<a href={list.url} target={list.target || "_self"} rel={list.target === "_blank" ? "noopener noreferrer" : ""}>
											{list.name}
										</a>
									) : (
										<span>{list.name}</span>
									)}
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

/**
 *
  AnimatePresence
    └── 조건부 렌더링
          └── motion.div
 *
 */

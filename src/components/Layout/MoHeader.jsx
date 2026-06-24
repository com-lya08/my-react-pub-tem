import Button from "../Button/Button";
import Menu from "./Menu";
import { useEffect, useRef, useCallback } from "react";

export function MoHeader({ mobileOpen, onClose }) {
	const headerRef = useRef(null);
	const prevFocusRef = useRef(null);

	const isVisible = (el) => {
		const style = window.getComputedStyle(el);
		return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
	};


	const getFocusable = useCallback(() => {
		const el = headerRef.current;
		if (!el) return [];

		return Array.from(el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(isVisible);
	}, []);

	useEffect(() => {
		if (!mobileOpen) return;

		prevFocusRef.current = document.activeElement;

		requestAnimationFrame(() => {
			headerRef.current?.focus();
		});

		return () => {
			prevFocusRef.current?.focus();
		};
	}, [mobileOpen]);

	useEffect(() => {
		if (!mobileOpen) return;

		const el = headerRef.current;
		if (!el) return;

		const handleKeyDown = (e) => {
			if (e.key !== "Tab") return;

			const focusable = getFocusable();

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last?.focus();
			}

			if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first?.focus();
			}
		};

		el.addEventListener("keydown", handleKeyDown);
		return () => el.removeEventListener("keydown", handleKeyDown);
	}, [mobileOpen, getFocusable]);

	return (
		<nav ref={headerRef} className={`gnb-mo ${mobileOpen ? "show" : ""}`} aria-label="주요 메뉴">
			<div className="gnb-mo-header">
				<div className="inner">
					<p className="title-md fw-600">Welcome!!</p>
				</div>

				<Button variant="btn-close" position="abs" onClick={onClose} />
			</div>

			<ul className="gnb-mo-body">
				<Menu isMobile={true} />
			</ul>
		</nav>
	);
}

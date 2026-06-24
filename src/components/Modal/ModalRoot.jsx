import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import clsx from "clsx";
// import styles from "./Modal.module.scss";
import { useModalStore } from "../../stores/useModalStore";
import Button from "../Button/Button";

export default function ModalRoot() {
	const { modals, closeModal, closeTopModal } = useModalStore();

	const isOpen = modals.length > 0;
	const topModal = modals[modals.length - 1];

	const modalRef = useRef(null);
	const prevFocusRef = useRef(null);

	// 🔥 ESC close (항상 Hook은 최상단)
	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (e) => {
			if (e.key === "Escape") {
				closeTopModal();
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen, closeTopModal]);

	// 🔥 scroll lock
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("is-modal-open");
		} else {
			document.body.classList.remove("is-modal-open");
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		prevFocusRef.current = document.activeElement;

		const timer = setTimeout(() => {
			modalRef.current?.focus();
		}, 0);

		return () => {
			clearTimeout(timer);
			prevFocusRef.current?.focus();
		};
	}, [isOpen]);

	const handleTabKey = (e) => {
		if (e.key !== "Tab") return;

		const modal = modalRef.current;
		if (!modal) return;

		const focusableEls = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');

		const elements = Array.from(focusableEls);
		if (elements.length === 0) {
			e.preventDefault();
			modal.focus();
			return;
		}

		const first = elements[0];
		const last = elements[elements.length - 1];

		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	};

	const root = document.getElementById("modal-root");
	if (!root || !isOpen) return null;

	return createPortal(
		<>
			{/* dim (single layer) */}
			<div className={clsx("layer-dimmed", "show")} style={{ zIndex: 1000 }} onClick={closeTopModal} />

			{/* modals stack */}
			{modals.map((modal, index) => {
				const isTop = modal.id === topModal.id;

				return (
					<div
						key={modal.id}
						role="dialog"
						aria-modal="true"
						aria-labelledby={`modal-title-${modal.id}`}
						tabIndex={-1}
						ref={isTop ? modalRef : null}
						onKeyDown={isTop ? handleTabKey : undefined}
						className={clsx("layer-popup", "show")}
						style={{
							zIndex: 1001 + index,
							pointerEvents: isTop ? "auto" : "none",
						}}
					>
						<div className="popup-container">
							<div className="popup-wrapper">
								<div className="popup-header">
									<h5>{modal.title}</h5>

									<Button
										variant="btn-close"
										position="abs"
										onClick={() => {
											closeModal(modal.id);
										}}
									/>
								</div>

								<div className="popup-body">{modal.content}</div>
							</div>
						</div>
					</div>
				);
			})}
		</>,
		root,
	);
}

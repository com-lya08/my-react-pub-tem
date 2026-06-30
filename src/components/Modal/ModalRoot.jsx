import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import clsx from "clsx";
// import styles from "./Modal.module.scss";
import { useModalStore } from "../../stores/useModalStore";
import Button from "../Button/Button";

export default function ModalRoot() {
	const { modals, closeModal, closeTopModal } = useModalStore();
	const runAction = useModalStore((state) => state.runAction);
	console.log(useModalStore.getState().modals);
	// console.log(modals);

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
		if (!modals.length) return;

		// 현재 포커스 저장
		prevFocusRef.current = document.activeElement;

		requestAnimationFrame(() => {
			modalRef.current?.focus();
		});

		return () => {
			// 모달 닫힐 때 이전 포커스로 복귀
			prevFocusRef.current?.focus?.();
		};
	}, [modals.length]);

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

	const root = document.getElementById("modal-root") || document.body;
	if (!root || !isOpen) return null;

	const baseZIndex = 1000;

	return createPortal(
		<>
			{/* dim (single layer) */}
			<div className={clsx("layer-dimmed", "show")} style={{ zIndex: baseZIndex + modals.length * 2 - 1 }} onClick={closeTopModal} />

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
							zIndex: baseZIndex + (index + 1) * 2,
							pointerEvents: isTop ? "auto" : "none",
						}}
					>
						<div className="popup-container">
							<div className="popup-wrapper">
								<div className="popup-header">
									<h2>{modal.title}</h2>

									<Button
										variant="btn-close"
										position="abs"
										onClick={() => {
											closeModal(modal.id);
										}}
									/>
								</div>

								<div className="popup-body">{modal.content}</div>
								{modal.footer && (
									<div className="popup-footer">
										{typeof modal.footer === "function"
											? modal.footer({
													id: modal.id,
													runAction,
												})
											: modal.footer}
									</div>
								)}
								{modal.type === "confirm" && (
									<div className="popup-footer">
										<div className="btn-wrap">
											<Button variant="btn-primary" onClick={() => runAction(modal.id, "onConfirm")}>
												{modal.confirmText}
											</Button>
											<Button variant="btn-secondary" onClick={() => runAction(modal.id, "onCancel")}>
												{modal.cancelText}
											</Button>
										</div>
									</div>
								)}
								{modal.type === "alert" && (
									<div className="popup-footer">
										<div className="btn-wrap align-right">
											<Button variant="btn-primary" onClick={() => runAction(modal.id, "onConfirm")}>
												{modal.confirmText}
											</Button>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</>,
		root,
	);
}

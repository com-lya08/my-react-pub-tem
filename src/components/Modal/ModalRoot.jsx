import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import clsx from "clsx";
// import styles from "./Modal.module.scss";
import { useModalStore } from "../../stores/useModalStore";
import Button from "../Button/Button";

import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ModalRoot() {
	const { modals, closeTopModal } = useModalStore();
	const runAction = useModalStore((state) => state.runAction);
	const isOpen = modals.length > 0;
	const topModal = modals[modals.length - 1];

	const modalRefs = useRef({});
	// const prevFocusRef = useRef(null);

	const isMobile = useMediaQuery("(max-width:768px)");


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
	}, [isOpen, closeTopModal, modals, topModal]);

	// 🔥 scroll lock
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("is-modal-open");
		} else {
			document.body.classList.remove("is-modal-open");
		}
	}, [isOpen]);

	// 포커스 처리
	const prevTopIdRef = useRef(null);
	const pageFocusRef = useRef(null);

	useEffect(() => {
		if (!topModal) {
			pageFocusRef.current?.focus?.();
			return;
		}

		// 첫 모달이 열릴 때만 페이지 포커스 저장
		if (!prevTopIdRef.current) {
			pageFocusRef.current = document.activeElement;
		}

		requestAnimationFrame(() => {
			modalRefs.current[topModal.id]?.focus();
		});

		prevTopIdRef.current = topModal.id;
	}, [topModal]);

	useEffect(() => {
		if (modals.length !== 0) return;

		requestAnimationFrame(() => {
			pageFocusRef.current?.focus?.();
		});

		pageFocusRef.current = null;
		prevTopIdRef.current = null;
	}, [modals.length]);

	// 모달안 포커스 트랩
	const handleTabKey = (e) => {
		if (e.key !== "Tab") return;

		const modal = modalRefs.current[topModal.id];
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

	const root = document.getElementById("root") || document.body;
	// if (!root || !isOpen) return null;
	const baseZIndex = 1000;

	return createPortal(
		<>
			{/* modals stack */}
			<AnimatePresence>
				{modals.map((modal, index) => {
					const isTop = modal.id === topModal.id;
					const isBottomSheet = modal.type === "bottomsheet" && isMobile;

					const animationProps = {
						initial: { opacity: 0, translateY: isBottomSheet ? "100%" : 0 },
						animate: { opacity: 1, translateY: isBottomSheet ? 0 : -5 },
						exit: { opacity: 0, translateY: isBottomSheet ? "100%" : 0 },
						transition: { duration: 0.1 },
					};
					return (
						(!modal.isNav || !isMobile) && (
							<motion.div
								key={modal.id}
								role="dialog"
								aria-modal="true"
								aria-labelledby={`modal-title-${modal.id}`}
								tabIndex={-1}
								ref={(el) => {
									if (el) {
										modalRefs.current[modal.id] = el;
									} else {
										delete modalRefs.current[modal.id];
									}
								}}
								onKeyDown={isTop ? handleTabKey : undefined}
								className={clsx("layer-popup", modal.type)}
								style={{
									zIndex: baseZIndex + (index + 1) * 2,
									pointerEvents: isTop ? "auto" : "none",
								}}
								{...animationProps}
							>
								<div className="popup-container">
									<div className="popup-container">
										<div className="popup-wrapper">
											<div className="popup-header">
												<h2>{modal.title}</h2>

												<Button
													variant="btn-close"
													position="abs"
													onClick={() => runAction(modal.id, "onCancel")}
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
							</motion.div>
						)
					);
				})}
			</AnimatePresence>

			{/* dim (single layer) */}
			<AnimatePresence>{isOpen && (!topModal.isNav || !isMobile) && <motion.div className="layer-dimmed" style={{ zIndex: baseZIndex + modals.length * 2 - 1 }} onClick={closeTopModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} />}</AnimatePresence>

			{/* {modals.map((modal, index) => {
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

					</div>
				);
			})} */}
		</>,
		root,
	);
}

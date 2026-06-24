import { useEffect, useState } from "react";
import { MoHeader } from "./MoHeader";
import Menu from "./Menu";
import { useModalStore } from "../../stores/useModalStore";

export default function Header() {
	const [pcOpen, setPcOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [bgHeight, setBgHeight] = useState(0);
	const openModal = useModalStore((state) => state.openModal);
	const clearModals = useModalStore((state) => state.clearModals);

	const handleMenuClick = () => {
		if (!isMobile) {
			openModal({
				title: "꺼져",
				content: "Zustand 모달입니다",
			});
			return;
		}

		setMobileOpen(true);
	};

	const handleMouseEnter = () => {
		const h = document.querySelector(".header").offsetHeight;
		let maxHeight = 0;

		document.querySelectorAll(".sub-menu").forEach((menu) => {
			maxHeight = Math.max(maxHeight, menu.offsetHeight);
		});

		setBgHeight(maxHeight + h);

		setPcOpen(true);
	};

	const handleMouseLeave = () => {
		setPcOpen(false);
		setBgHeight(0);
	};

	// body scroll lock
	useEffect(() => {
		document.body.classList.toggle("is-modal-open", mobileOpen);
	}, [mobileOpen]);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);

			if (!mobile) {
				setMobileOpen(false);
			} else {
				clearModals();
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [clearModals]);

	return (
		<>
			<header id="header" className={`header ${pcOpen ? "menu-open" : ""}`}>
				<div className="header-inner">
					<h1 className="logo">
						<a href="/" aria-label="홈으로 이동">
							MyWebsite
						</a>
					</h1>
					<nav aria-label="주요 메뉴">
						<ul className="gnb" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
							<Menu />
						</ul>
					</nav>
					<div className="utils">
						<button type="button" onClick={handleMenuClick} aria-label={isMobile ? "사이트맵 열기" : "메뉴 열기"}>
							<span className="menu-icon-btn">
								<span className="menu-icon-bar"></span>
								<span className="menu-icon-bar"></span>
								<span className="menu-icon-bar"></span>
							</span>
						</button>
					</div>
				</div>
			</header>
			{!isMobile && <div className="header-bg" style={{ height: `${bgHeight}px` }}></div>}
			{isMobile && <MoHeader mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />}
		</>
	);
}

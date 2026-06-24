import { useState } from "react";
import clsx from "clsx";

const menuData = [
	{
		title: "소개",
		key: "about",
		children: [
			{ label: "회사소개", href: "#" },
			{ label: "연혁", href: "#" },
		],
	},
	{
		title: "서비스",
		key: "service",
		children: [
			{ label: "구독", href: "#" },
			{ label: "상품", href: "#" },
		],
	},
	{
		title: "포트폴리오",
		key: "portfolio",
		children: [
			{ label: "구독", href: "#" },
			{ label: "상품", href: "#" },
		],
	},
	{
		title: "문의하기",
		key: "contact",
		children: [
			{ label: "구독", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
		],
	},
	{
		title: "일반",
		key: "general",
		children: [
			{ label: "구독", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
			{ label: "상품", href: "#" },
		],
	},
];

export default function Menu({ isMobile }) {
	const [openMenu, setOpenMenu] = useState(null);

	const toggleSubMenu = (key) => {
		if (!isMobile) return;
		setOpenMenu((prev) => (prev === key ? null : key));
	};

	return (
		<>
			{menuData.map((menu) => (
				<li key={menu.key}>
					<a href={`#${menu.key}`} onClick={() => toggleSubMenu(menu.key)}>
						{menu.title}
					</a>

					<ul className={clsx("sub-menu", openMenu === menu.key && "show")}>
						{menu.children.map((item, idx) => (
							<li key={idx}>
								<a href={item.href}>{item.label}</a>
							</li>
						))}
					</ul>
				</li>
			))}
		</>
	);
}

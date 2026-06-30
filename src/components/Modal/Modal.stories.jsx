import Button from "../Button/Button";
import { useModalStore } from "../../stores/useModalStore";

export default {
	title: "Components/Modal",
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
};

export const ConfirmType = {
	args: {
		variant: "btn-primary",
		children: "Open Confirm",
	},

	render: (args) => {
		const openConfirm = useModalStore((s) => s.openConfirm);
		return (
			<>
				<Button
					variant={args.variant}
					onClick={() => {
						openConfirm({
							title: "Zustand",
							content: "openConfirm 모달입니다",
							closeOnConfirm: true,
							confirmText: "yes",
							onConfirm: () => {
								return new Promise((resolve) => {
									setTimeout(() => {
										alert("tesssst!!!");
										resolve();
									}, 1000);
								});
							},
						});
					}}
				>
					{args.children}
				</Button>
			</>
		);
	},
};

export const AlertType = {
	args: {
		variant: "btn-primary",
		children: "Open Alert",
	},

	render: (args) => {
		const openAlert = useModalStore((s) => s.openAlert);
		return (
			<>
				<Button
					variant={args.variant}
					onClick={() => {
						openAlert({
							title: "Zustand",
							content: "알럿입니다.",
						});
					}}
				>
					{args.children}
				</Button>
			</>
		);
	},
};

export const CustomType = {
	args: {
		variant: "btn-primary",
		children: "Open Custom",
	},

	render: (args) => {
		const openCustom = useModalStore((s) => s.openCustom);
		const openAlert = useModalStore((s) => s.openAlert);

		return (
			<>
				<Button
					variant={args.variant}
					onClick={() => {
						openCustom({
							title: "Zustand",
							content: <h3>아아아아아아ㅏ 나는 토마토입니다</h3>,
							footer: ({ id, runAction }) => (
								<div className="btn-wrap">
									<Button
										variant="btn-line"
										onClick={() =>
											openAlert({
												title: "알림",
												content: "확인되었습니다.",
											})
										}
									>
										테스트
									</Button>
									<Button
										variant="btn-line"
										onClick={() => {
											console.log("clicked");
											runAction(id, "onCancel");
										}}
									>
										닫기
									</Button>
								</div>
							),
						});
					}}
				>
					{args.children}
				</Button>
			</>
		);
	},
};

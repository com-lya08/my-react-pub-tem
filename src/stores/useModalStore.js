// stores/useModalStore.js
import { create } from "zustand";

export const useModalStore = create((set, get) => ({
	modals: [],

	openAlert: ({ title = "", content = "", confirmText = "확인", onConfirm }) => {
		const id = crypto.randomUUID();

		set((state) => ({
			modals: [
				...state.modals,
				{
					id,
					type: "alert",
					title,
					content,
					confirmText,
					onConfirm,
				},
			],
		}));

		return id;
	},

	openConfirm: ({ title = "", content = "", confirmText = "확인", cancelText = "취소", onConfirm, onCancel, closeOnConfirm = false }) => {
		const id = crypto.randomUUID();

		set((state) => ({
			modals: [
				...state.modals,
				{
					id,
					type: "confirm",
					title,
					content,
					confirmText,
					cancelText,
					onConfirm,
					onCancel,
					closeOnConfirm,
				},
			],
		}));

		return id;
	},

	openCustom: ({ title = "", content, footer, onConfirm, onCancel }) => {
		const id = crypto.randomUUID();

		set((state) => ({
			modals: [
				...state.modals,
				{
					id,
					type: "custom",
					title,
					content,
					footer,
					onConfirm,
					onCancel,
				},
			],
		}));

		return id;
	},

	runAction: async (id, action) => {
		const modal = get().modals.find((m) => m.id === id);
		if (!modal) return;

		await modal[action]?.();

		const shouldClose = action === "onConfirm" ? (modal.closeOnConfirm ?? true) : action === "onCancel" ? (modal.closeOnCancel ?? true) : true;

		if (shouldClose) {
			get().closeModal(id);
		}
	},

	closeModal: (id) =>
		set((state) => ({
			modals: state.modals.filter((m) => m.id !== id),
		})),

	closeTopModal: () => {
		const modals = get().modals;
		if (!modals.length) return;
		get().closeModal(modals[modals.length - 1].id);
	},

	clearModals: () => set({ modals: [] }),
}));

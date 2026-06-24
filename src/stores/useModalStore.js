// stores/useModalStore.js
import { create } from "zustand";

export const useModalStore = create((set, get) => ({
	modals: [],

	openModal: (modal) =>
		set((state) => ({
			modals: [
				...state.modals,
				{
					id: modal.id || crypto.randomUUID(),
					title: modal.title,
					content: modal.content,
				},
			],
		})),

	closeModal: (id) =>
		set((state) => ({
			modals: state.modals.filter((m) => m.id !== id),
		})),

	closeTopModal: () => {
		const modals = get().modals;
		if (!modals.length) return;

		const top = modals[modals.length - 1];
		set({
			modals: modals.filter((m) => m.id !== top.id),
		});
	},

	clearModals: () => set({ modals: [] }),
}));

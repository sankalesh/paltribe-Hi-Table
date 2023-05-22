import { create } from 'zustand'

interface IUseBottomPanel {
	openedBottomPanels: object
	openBottomPanel: (panelName: string) => void
	closeBottomPanel: (panelName: string) => void
	isBottomPanelOpened: (panelName: string) => boolean
}

export const useBottomPanel = create<IUseBottomPanel>((set, get) => ({
	openedBottomPanels: {},
	openBottomPanel: (panelId: string) =>
		set((state) => ({
			openedBottomPanels: {
				...state.openedBottomPanels,
				[`${panelId}`]: true,
			},
		})),
	closeBottomPanel: (panelId: string) =>
		set((state) => ({
			openedBottomPanels: {
				...state.openedBottomPanels,
				[`${panelId}`]: false,
			},
		})),
	isBottomPanelOpened: (panelId: string) => get().openedBottomPanels[`${panelId}`] || false,
}))
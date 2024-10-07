export type ListItemType = {
    id: number;
    children: ListItemType[];
};

export const initialList: ListItemType = {
    id: 1,
    children: [],
};


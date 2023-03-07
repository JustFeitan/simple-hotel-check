import { useMemo, useState } from "react";

type SortingOrder = "ASC" | "DESC";
type SortingConfig<T> = { field: string; sortType: SortingOrder };

export function useSortByField<T>(initialData: T[], initialSortConfig?: SortingConfig<T>, updateParams?: any[]) {
    if (!updateParams) updateParams = [];
    const [sortBy, setSortBy] = useState<string | undefined>(initialSortConfig?.field);
    const [sortType, setSortType] = useState<"DESC" | "ASC">(initialSortConfig?.sortType ?? "ASC");
    const sortedItems = useMemo(() => {
        if (!sortBy) return initialData;
        return [...initialData].sort((a: T, b: T) => {
            const aField = getField(a, sortBy);
            const bField = getField(b, sortBy);
            if (aField < bField) {
                return sortType === "ASC" ? -1 : 1;
            } else if (aField > bField) {
                return sortType === "ASC" ? 1 : -1;
            }
            return 0;
        });
    }, [initialData, sortBy, sortType, ...updateParams]);

    function getField(obj: any, field: string) {
        const fieldParts = field.split(".");
        let result = obj;
        for (let i = 0; i < fieldParts.length; i++) {
            result = result[fieldParts[i]];
        }
        return result;
    }

    function sortDataBy(sortBy: string) {
        setSortBy(sortBy);
        if (sortType === "ASC") {
            setSortType("DESC");
        } else {
            setSortType("ASC");
        }
    }

    return { sortedItems, sortBy, sortType, sortDataBy } as const;
}

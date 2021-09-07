import React, { useEffect, useMemo, useState } from "react";


let lastTabIndex = 1;


export default function useTabIndexCycle({ total, refStart, refEnd, toUpdate, toAutofocus = false }: useTabIndexCycleProps) {
	if(total === 0)
		return;

	const [tabIndexStart] = useState(++lastTabIndex);
	const [tabIndexEnd] = useState(lastTabIndex + total + 1);
	lastTabIndex += total + 2;

	const [cycleToStart, cycleToEnd] = useMemo(() => [
		() => document.querySelector<HTMLElement>(`[tabindex=\"${ tabIndexStart + 1 }\"]`)?.focus(),
		() => document.querySelector<HTMLElement>(`[tabindex=\"${ tabIndexEnd - 1 }\"]`)?.focus(),
	], [toUpdate]);

	// навешиваем хендлеры фокуса когда обновляется флаг toUpdate
	useEffect(() => {
		if(refStart && refStart.current)
			refStart.current.onfocus = cycleToEnd;

		if(refEnd && refEnd.current)
			refEnd.current.onfocus = cycleToStart;
	}, [toUpdate]);

	// при маунте фокусим первый элемент
	useEffect(() => {
		if(!toAutofocus)
			return;

		document.querySelector<HTMLElement>(`[tabindex=\"${ tabIndexStart + 1 }\"]`)?.focus();
	}, []);

	return { tabIndexStart, tabIndexEnd, };
};

type useTabIndexCycleProps = {
	toAutofocus?: boolean,
	toUpdate: boolean | string,
	refStart: React.MutableRefObject<HTMLSpanElement>,
	refEnd: React.MutableRefObject<HTMLSpanElement>,
	total: number,
};

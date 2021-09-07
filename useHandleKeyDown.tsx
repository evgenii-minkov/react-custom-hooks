import React, { useEffect, useRef } from "react";


export default function useHandleKeyDown({ keys }: useHandleKeyDownProps) {
	const handlingKey = useRef(false);

	useEffect(() => {
		const _executeKeyHandler = (e: KeyboardEvent, { handler, preventDefault = true, stopPropagation = true }: Key) => {
			preventDefault && e.preventDefault();
			stopPropagation && e.stopPropagation();
			handlingKey.current = true;
			handler(e);
			handlingKey.current = false;
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if(handlingKey.current)
				return;

			const key = keys[e.which];
			if(!key)
				return;

			_executeKeyHandler(e, key);
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [keys]);
}

type useHandleKeyDownProps = {
	keys: Keys,
};

type Keys = {
	[which: number]: Key,
};

type Key = {
	handler: Function,
	preventDefault?: boolean,
	stopPropagation?: boolean,
};

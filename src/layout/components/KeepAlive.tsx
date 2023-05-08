import {useRef, useEffect, useReducer, useMemo, memo, useState} from "react";
import { useLocation, useOutlet } from "react-router-dom";
import {RootState, useSelector} from "@/redux";

const KeepAlive = (props: any) => {
	const outlet = useOutlet();
	const { exclude } = props;
	const { pathname } = useLocation();
	const componentList = useRef(new Map());
	const forceUpdate = useReducer((bool: any) => !bool, true)[1]; // 强制渲染
	const cacheKey = useMemo(() => pathname + "__", [pathname]); // eslint-disable-line
	const activeKey = useRef<string>("");
	const {isShow} = useSelector((state: RootState) => state.tabs);

	useEffect(() => {
		componentList.current.forEach(function (value, key) {
			const _key = key.split("__")[0];
			if (exclude.includes(_key) || _key === pathname) {
				// @ts-ignore
				this.delete(key);
			}
		}, componentList.current);
		activeKey.current = cacheKey;
		if (!componentList.current.has(activeKey.current)) {
			componentList.current.set(activeKey.current, outlet);
		}
		forceUpdate();
	}, [cacheKey, exclude])

	return (
		<div>
			{Array.from(componentList.current).map(([key, component]) => (
				<div key={key}>
					{
					key === activeKey.current && isShow ?
					<div style={{height: 'calc(100vh - 101px)'}}>{component}</div>
					: key === activeKey.current && !isShow ?
					<div style={{height: 'calc(100vh - 101px)'}}></div>
					 : <div style={{ display: "none" }}>{component}</div>}
				</div>
			))}
		</div>
	);
};

export default memo(KeepAlive);

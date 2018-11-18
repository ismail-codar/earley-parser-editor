import fjsx from '@fjsx/runtime';
import classNames from 'classnames';
import { domRemovableEvent, domMouseInElement } from '../../utils/dom-util';

export interface DropdownProps {
	opened$?: boolean;
	button: JSX.Element;
}

export const Dropdown = (props: DropdownProps) => {
	fjsx.setDefaults(props, { opened$: false });

	const toggleButton = (props.button as any) as HTMLElement;
	toggleButton.classList.add('dropdown-toggle');
	toggleButton.addEventListener('click', () => {
		props.opened$ = !props.opened$;
	});

	let dropdownMenuDiv: HTMLElement = null;

	fjsx.compute(() => {
		if (props.opened$)
			domRemovableEvent((e: MouseEvent) => {
				if (!domMouseInElement(e, dropdownMenuDiv)) {
					props.opened$ = false;
					return true;
				}
				return false;
			});
	}, props['opened$']);

	return (
		<div className={classNames({ dropdown: true, show: props.opened$ })}>
			{props.button}
			<div
				ref={(element: HTMLElement) => (dropdownMenuDiv = element)}
				className={classNames({ 'dropdown-menu': true, show: props.opened$ })}
				aria-labelledby="dropdownMenuButton"
			>
				<a className="dropdown-item" href="#">
					Action
				</a>
				<a className="dropdown-item" href="#">
					Another action
				</a>
				<a className="dropdown-item" href="#">
					Something else here
				</a>
			</div>
		</div>
	);
};

import fjsx from '@fjsx/runtime';
import classNames from 'classnames';

export interface SelectProps {
	opened$?: boolean;
	button: JSX.Element;
}

export const Select = (props: SelectProps) => {
	fjsx.setDefaults(props, { opened$: false });

	const toggleButton = (props.button as any) as HTMLElement;
	toggleButton.classList.add('dropdown-toggle');
	toggleButton.addEventListener('click', () => {
		props.opened$ = !props.opened$;
	});
	return (
		<div className={classNames({ dropdown: true, show: props.opened$ })}>
			{props.button}
			<div
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

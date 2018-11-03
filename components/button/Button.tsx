import { rippleEffect } from '../../utils/ripple-effect';
import { MouseEvent } from 'react';

export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'danger' | 'info' | 'success' | 'warning' | 'dark' | 'light';
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
	const classes = [ 'btn', 'btn-' + props.variant || 'primary' ];
	const button = (
		<button type="button" onClick={props.onClick} className={classes.join(' ')}>
			{props['children']}
		</button>
	);
	rippleEffect(button as any);
	return button;
};

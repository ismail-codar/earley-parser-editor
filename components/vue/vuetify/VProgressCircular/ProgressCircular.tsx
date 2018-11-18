// import '../../stylus/components/_progress-circular.styl'
import classNames from 'classnames';

export const ProgressCircular = (props: {
	button?: Boolean;
	indeterminate?: Boolean;
	rotate?: number;
	size?: number;
	width?: number;
	value$: number;
}) => {
	const radius = (): number => {
		return 20;
	};
	const circumference = (): number => {
		return 2 * Math.PI * radius();
	};
	const normalizedValue$ = props.value$ < 0 ? 0 : props.value$ > 100 ? 100 : props.value$;
	const strokeDashOffset$ = (100 - normalizedValue$) / 100 * circumference() + 'px';

	const _this = new class {
		value$ = props.value$;
		size = props.size || 32;
		button = props.button || false;
		indeterminate = props.indeterminate || false;
		rotate = props.rotate || 0;
		width = props.width || 4;
		calculatedSize(): number {
			return Number(this.size) + (this.button ? 8 : 0);
		}
		classes(): object {
			return {
				'v-progress-circular--indeterminate': this.indeterminate,
				'v-progress-circular--button': this.button
			};
		}
		strokeDashArray(): number {
			return Math.round(circumference() * 1000) / 1000;
		}
		strokeWidth(): number {
			return this.width / +this.size * this.viewBoxSize() * 2;
		}
		styles(): object {
			return {
				height: `${this.calculatedSize()}px`,
				width: `${this.calculatedSize()}px`
			};
		}
		svgStyles(): object {
			return {
				transform: `rotate(${this.rotate}deg)`
			};
		}
		viewBoxSize(): number {
			return radius() / (1 - this.width / +this.size);
		}
	}();

	const genCircle = (name: string, offset$: string | number) => (
		<circle
			fill="transparent"
			cx={2 * _this.viewBoxSize()}
			cy={2 * _this.viewBoxSize()}
			r={radius()}
			stroke-width={_this.strokeWidth()}
			stroke-dasharray={_this.strokeDashArray()}
			stroke-dashoffset={offset$}
			className={'v-progress-circular__' + name}
		/>
	);

	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			// aria-valuenow={_this.indeterminate ? undefined : normalizedValue$}
			className={classNames({ 'v-progress-circular': true }, _this.classes())}
			style={_this.styles()}
		>
			<svg
				viewBox={`${_this.viewBoxSize()} ${_this.viewBoxSize()} ${2 * _this.viewBoxSize()} ${2 *
					_this.viewBoxSize()}`}
				style={_this.svgStyles()}
			>
				{/* {_this.indeterminate ? null : genCircle('underlay', 0)}
				{genCircle('overlay', strokeDashOffset$)} */}
				<circle
					fill="transparent"
					cx={2 * _this.viewBoxSize()}
					cy={2 * _this.viewBoxSize()}
					r={radius()}
					stroke-width={_this.strokeWidth()}
					stroke-dasharray={_this.strokeDashArray()}
					stroke-dashoffset={0}
					className={'v-progress-circular__' + 'underlay'}
				/>
				<circle
					fill="transparent"
					cx={2 * _this.viewBoxSize()}
					cy={2 * _this.viewBoxSize()}
					r={radius()}
					stroke-width={_this.strokeWidth()}
					stroke-dasharray={_this.strokeDashArray()}
					stroke-dashoffset={strokeDashOffset$}
					className={'v-progress-circular__' + 'overlay'}
				/>
			</svg>
			<div className="v-progress-circular__info" />
		</div>
	);
};

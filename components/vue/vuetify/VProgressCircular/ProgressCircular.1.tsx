// import '../../stylus/components/_progress-circular.styl'
import classNames from 'classnames';

export const ProgressCircular = (props: {
	button?: Boolean;
	indeterminate?: Boolean;
	rotate?: number;
	size?: number;
	width?: number;
	value: number;
}) => {
	const _this = new class {
		value = props.value;
		size = props.size || 32;
		button = props.button || false;
		indeterminate = props.indeterminate || false;
		rotate = props.rotate || 0;
		width = props.width || 4;
		get calculatedSize(): number {
			return Number(this.size) + (this.button ? 8 : 0);
		}
		get circumference(): number {
			return 2 * Math.PI * this.radius;
		}
		get classes(): object {
			return {
				'v-progress-circular--indeterminate': this.indeterminate,
				'v-progress-circular--button': this.button
			};
		}
		get normalizedValue(): number {
			if (this.value < 0) {
				return 0;
			}

			if (this.value > 100) {
				return 100;
			}

			return this.value;
		}
		get radius(): number {
			return 20;
		}
		get strokeDashArray(): number {
			return Math.round(this.circumference * 1000) / 1000;
		}
		get strokeDashOffset(): string {
			return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
		}
		get strokeWidth(): number {
			return this.width / +this.size * this.viewBoxSize * 2;
		}
		get styles(): object {
			return {
				height: `${this.calculatedSize}px`,
				width: `${this.calculatedSize}px`
			};
		}
		get svgStyles(): object {
			return {
				transform: `rotate(${this.rotate}deg)`
			};
		}
		get viewBoxSize(): number {
			return this.radius / (1 - this.width / +this.size);
		}
	}();

	const genCircle = (name: string, offset: string | number) => (
		<circle
			fill="transparent"
			cx={2 * _this.viewBoxSize}
			cy={2 * _this.viewBoxSize}
			r={_this.radius}
			stroke-width={_this.strokeWidth}
			stroke-dasharray={_this.strokeDashArray}
			stroke-dashoffset={offset}
			className={'v-progress-circular__' + name}
		/>
	);

	return (
		<div
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={_this.indeterminate ? undefined : _this.normalizedValue}
			className={classNames({ 'v-progress-circular': true }, _this.classes)}
			style={_this.styles}
		>
			<svg
				viewBox={`${_this.viewBoxSize} ${_this.viewBoxSize} ${2 * _this.viewBoxSize} ${2 * _this.viewBoxSize}`}
				style={_this.svgStyles}
			>
				{_this.indeterminate ? null : genCircle('underlay', 0)}
				{genCircle('overlay', _this.strokeDashOffset)}
			</svg>
			<div className="v-progress-circular__info" />
		</div>
	);
};

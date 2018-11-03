import cssobj from 'cssobj';

const rippleClasses = cssobj(
	{
		'.waves': {
			position: 'relative',
			overflow: 'hidden'
		},
		'.ripple': {
			backgroundColor: 'rgba(221, 221, 221, 0.4)',
			borderRadius: '100%',
			width: '10px',
			height: '10px',
			position: 'absolute'
		}
	},
	{ local: true }
);

export const rippleEffect = (node: HTMLElement, backgroundColor?: string) => {
	if (backgroundColor) {
		rippleClasses.obj['.ripple'].backgroundColor = backgroundColor;
	}

	node.classList.add(rippleClasses.mapClass('waves'));
	const rippleClass = rippleClasses.mapClass('ripple');
	node.addEventListener('click', (event: MouseEvent) => {
		event.preventDefault();
		const button = event.currentTarget as HTMLElement;

		const xPos = event.pageX - button.offsetLeft,
			yPos = event.pageY - button.offsetTop,
			elWavesRipple = document.createElement('div');

		elWavesRipple.className = rippleClass;
		elWavesRipple.style.left = xPos + 'px';
		elWavesRipple.style.top = yPos + 'px';

		const rippleElm = button.appendChild(elWavesRipple);

		elWavesRipple.animate({ opacity: [ 1, 0 ], transform: [ 'scale(1)', 'scale(40)' ] }, {
			duration: 1000,
			easing: 'ease-out'
		}).onfinish = () => {
			elWavesRipple.remove();
		};
	});
};
